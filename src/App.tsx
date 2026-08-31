import { useEffect, useMemo, useState } from 'react';
import { CinematicVisual } from './cinematic/CinematicVisual';
import { cinematicScroll } from './cinematic/scrollState';
import { InteractiveRoomExperience } from './interactive/InteractiveRoomExperience';
import './interactive/interactive.css';
import './journey/journey.css';
import { useAppStore } from './stores/useAppStore';
import {
  DEPARTMENT_COPY,
  getRoomsForDepartment,
  isRoomReady,
  type Department,
  type JourneyRoom,
  type RoomKey,
} from './journey/journeyModel';

type Language = 'ar' | 'en';
type ChapterCopy = { eyebrow: string; title: string; body: string };

const COPY: Record<Language, any> = {
  ar: {
    navJourney: 'رحلة القصر',
    navContact: 'تواصل معنا',
    scroll: 'مرّر للاقتراب من القصر',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'قصر قبيصة الافتراضي',
      body: 'رحلة ثلاثية الأبعاد مصممة كزيارة حقيقية: اقترب من القصر، اختر الجناح، ثم ادخل الغرفة واستكشف الأثاث من الداخل.',
    },
    gate: {
      eyebrow: 'البوابة الرئيسية',
      title: 'اختر عالمك داخل قبيصة',
      body: 'وصلت إلى نقطة القرار الأولى. اختر المودرن أو النيو كلاسيك؛ بعدها تتحرك الرحلة داخل هول معماري مخصص للجناح الذي اخترته.',
    },
    modernHall: {
      eyebrow: 'MODERN WING',
      title: 'أنت داخل جناح المودرن',
      body: 'استمر في التمرير. تمر الكاميرا عبر الهول وتكشف مداخل المعيشة والسفرة وغرف النوم والأطفال تدريجيًا.',
    },
    classicHall: {
      eyebrow: 'NEO-CLASSICAL WING',
      title: 'أنت داخل جناح النيو كلاسيك',
      body: 'تحرك داخل هول أكثر دفئًا وثراءً، مع مداخل مرئية للصالونات والسفرة وغرف النوم.',
    },
    roomGate: {
      eyebrow: 'ROOM PORTALS',
      title: 'اختر الغرفة التي تريد دخولها',
      body: 'الملصقات أمامك مرتبطة بمداخل الغرف الظاهرة داخل الهول. الغرف الجاهزة فقط يمكن دخولها؛ باقي المداخل تظهر كمعاينة حتى تكتمل بصريًا.',
    },
    chooseDepartment: 'اختر الجناح',
    selected: 'الجناح الحالي',
    change: 'العودة للبوابة',
    enter: 'دخول الغرفة',
    preview: 'معاينة — قريبًا',
    ready: 'جاهزة للاستكشاف',
    contactTitle: 'اكتشف قبيصة بطريقة مختلفة',
    contactBody: 'الأسعار والمواصفات الرقمية لا تظهر إلا بعد التحقق منها. أي قطعة استرشادية غير موثقة تبقى بسعر عند الطلب.',
    facebook: 'صفحة قبيصة على فيسبوك',
  },
  en: {
    navJourney: 'Palace Journey',
    navContact: 'Contact',
    scroll: 'Scroll toward the palace',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'Qubaisa Virtual Palace',
      body: 'A guided 3D visit: approach the palace, choose a wing, enter a room and explore the furniture from inside the space.',
    },
    gate: {
      eyebrow: 'MAIN GATE',
      title: 'Choose your world inside Qubaisa',
      body: 'This is the first decision point. Choose Modern or Neo-Classical and the journey continues through a dedicated architectural hall.',
    },
    modernHall: {
      eyebrow: 'MODERN WING',
      title: 'You are inside the Modern wing',
      body: 'Keep scrolling as the hall reveals Living, Dining, Bedrooms and Kids & Youth portals progressively.',
    },
    classicHall: {
      eyebrow: 'NEO-CLASSICAL WING',
      title: 'You are inside the Neo-Classical wing',
      body: 'Travel through a warmer, richer hall with visible portals for Salons, Dining and Bedrooms.',
    },
    roomGate: {
      eyebrow: 'ROOM PORTALS',
      title: 'Choose the room you want to enter',
      body: 'The labels align with architectural portals visible in the hall. Only production-ready rooms can be entered; the rest remain previews until visually complete.',
    },
    chooseDepartment: 'Choose a wing',
    selected: 'Current wing',
    change: 'Back to gate',
    enter: 'Enter room',
    preview: 'Preview — coming soon',
    ready: 'Ready to explore',
    contactTitle: 'Experience Qubaisa differently',
    contactBody: 'Numeric pricing and specifications are shown only after verification. Unverified display pieces remain price on request.',
    facebook: 'Qubaisa on Facebook',
  },
};

export default function App() {
  const language = useAppStore((state) => state.language) as Language;
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [department, setDepartment] = useState<Department | null>(null);
  const [interactiveRoom, setInteractiveRoom] = useState<{ department: Department; room: RoomKey } | null>(null);
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const journeyEnd = document.getElementById(department ? 'room-gate' : 'gate');
      const journeyBottom = journeyEnd
        ? journeyEnd.offsetTop + journeyEnd.offsetHeight - window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const max = Math.max(1, journeyBottom);
      cinematicScroll.progress = Math.min(1, Math.max(0, window.scrollY / max));
      cinematicScroll.viewportHeight = window.innerHeight;
      raf = 0;
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [department]);

  const selectDepartment = (next: Department) => {
    setDepartment(next);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById('department-hall')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const changeDepartment = () => {
    setDepartment(null);
    window.requestAnimationFrame(() => {
      document.getElementById('gate')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const enterRoom = (room: JourneyRoom) => {
    if (!department || !isRoomReady(room)) return;
    setInteractiveRoom({ department, room: room.id });
  };

  const hallCopy = department === 'classic' ? copy.classicHall : copy.modernHall;
  const departmentMeta = department ? DEPARTMENT_COPY[department] : null;
  const roomOptions = useMemo(
    () => (department ? getRoomsForDepartment(department) : []),
    [department],
  );

  return (
    <main className="cinematic-site palace-journey">
      <header className="cinematic-header" aria-label="Qubaisa navigation">
        <a href="#top" className="brand-mark" aria-label="Qubaisa home">
          <img src="/brand/qubaisa-logo.webp" alt="Qubaisa Furniture" />
        </a>
        <nav className="cinematic-nav" aria-label="Primary">
          <a href="#gate">{copy.navJourney}</a>
          <a href="#contact">{copy.navContact}</a>
          <button
            type="button"
            className="language-switch"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </button>
        </nav>
      </header>

      <div className="cinematic-visual" aria-hidden="true">
        <CinematicVisual department={department} />
        <div className="cinematic-grade" />
        <div className="cinematic-vignette" />
        <div className="cinematic-grain" />
      </div>

      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <section id="top" className="story-chapter story-hero journey-arrival">
        <Chapter copy={copy.hero} align={language === 'ar' ? 'right' : 'left'} hero />
        <div className="scroll-cue"><span>{copy.scroll}</span><i /></div>
      </section>

      <section id="gate" className="story-chapter journey-gate">
        <div className="journey-gate__copy">
          <Chapter copy={copy.gate} align={language === 'ar' ? 'right' : 'left'} />
          <span className="journey-step-label">02 — {copy.chooseDepartment}</span>
        </div>

        <div className="department-choice" role="group" aria-label={copy.chooseDepartment} style={{ direction: 'ltr' }}>
          {(['modern', 'classic'] as Department[]).map((choice, index) => {
            const meta = DEPARTMENT_COPY[choice];
            const selected = department === choice;
            return (
              <button
                type="button"
                key={choice}
                className={`${selected ? 'is-selected' : ''} department-choice--${choice}`}
                onClick={() => selectDepartment(choice)}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <span>{String(index + 1).padStart(2, '0')} · {meta.eyebrow}</span>
                <strong>{language === 'ar' ? meta.titleAr : meta.titleEn}</strong>
                <small>{language === 'ar' ? meta.hintAr : meta.hintEn}</small>
                <i aria-hidden="true">→</i>
              </button>
            );
          })}
        </div>
      </section>

      {department && departmentMeta && (
        <>
          <section id="department-hall" className={`story-chapter department-hall department-hall--${department}`}>
            <div className="department-current">
              <span>{copy.selected}</span>
              <strong>{language === 'ar' ? departmentMeta.titleAr : departmentMeta.titleEn}</strong>
              <button type="button" onClick={changeDepartment}>{copy.change}</button>
            </div>
            <Chapter copy={hallCopy} align={language === 'ar' ? 'left' : 'right'} />
          </section>

          <section id="room-gate" className={`story-chapter room-gate room-gate--${department}`}>
            <div className="room-gate__intro">
              <Chapter copy={copy.roomGate} align={language === 'ar' ? 'right' : 'left'} />
            </div>

            <div className="room-portal-nav" role="list" aria-label={copy.roomGate.title}>
              {roomOptions.map((room) => {
                const ready = isRoomReady(room);
                return (
                  <button
                    type="button"
                    key={room.id}
                    className={`room-portal-link room-portal-link--${room.id} ${ready ? 'is-ready' : 'is-preview'}`}
                    disabled={!ready}
                    onClick={() => enterRoom(room)}
                    role="listitem"
                  >
                    <span>{String(room.order).padStart(2, '0')}</span>
                    <strong>{language === 'ar' ? room.titleAr : room.titleEn}</strong>
                    <small>{language === 'ar' ? room.subtitleAr : room.subtitleEn}</small>
                    <em>{ready ? copy.ready : copy.preview}</em>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      <footer id="contact" className="cinematic-footer journey-footer">
        <img src="/brand/qubaisa-logo.webp" alt="Qubaisa Furniture" />
        <div>
          <span>QUBAISA FURNITURE</span>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactBody}</p>
          <a
            href="https://web.facebook.com/people/Kubaisa-Furniture-%D9%82%D8%A8%D9%8A%D8%B5%D8%A9-%D9%84%D9%84%D8%A3%D8%AB%D8%A7%D8%AB/61558987945090/"
            target="_blank"
            rel="noreferrer"
          >
            {copy.facebook}
          </a>
        </div>
      </footer>

      {interactiveRoom && (
        <InteractiveRoomExperience
          room={interactiveRoom}
          language={language}
          onClose={() => setInteractiveRoom(null)}
        />
      )}
    </main>
  );
}

function Chapter({ copy, align, hero = false }: { copy: ChapterCopy; align: 'left' | 'right'; hero?: boolean }) {
  return (
    <div className={`chapter-copy chapter-copy--${align} ${hero ? 'chapter-copy--hero' : ''}`}>
      <span className="chapter-eyebrow">{copy.eyebrow}</span>
      <h1>{copy.title}</h1>
      <p>{copy.body}</p>
    </div>
  );
}
