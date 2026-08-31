import { useEffect, useMemo, useState } from 'react';
import { CinematicVisual } from './cinematic/CinematicVisual';
import { cinematicScroll } from './cinematic/scrollState';
import { InteractiveRoomExperience, type InteractiveRoom } from './interactive/InteractiveRoomExperience';
import './interactive/interactive.css';
import './journey/journey.css';
import { useAppStore } from './stores/useAppStore';

type Language = 'ar' | 'en';
type Department = 'modern' | 'classic';
type RoomKey = 'living' | 'dining' | 'bedroom' | 'kids';

type ChapterCopy = {
  eyebrow: string;
  title: string;
  body: string;
};

type RoomOption = {
  id: RoomKey;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  enabled: boolean;
};

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'living',
    titleAr: 'المعيشة والصالونات',
    titleEn: 'Living & Salons',
    subtitleAr: 'ادخل الغرفة واستكشف القطع والأسعار',
    subtitleEn: 'Enter the room and explore pieces and prices',
    enabled: true,
  },
  {
    id: 'dining',
    titleAr: 'غرف السفرة',
    titleEn: 'Dining Rooms',
    subtitleAr: 'قريبًا — صالات سفرة كاملة داخل القصر',
    subtitleEn: 'Coming soon — full dining suites inside the palace',
    enabled: false,
  },
  {
    id: 'bedroom',
    titleAr: 'غرف النوم',
    titleEn: 'Bedrooms',
    subtitleAr: 'قريبًا — أجنحة غرف نوم متكاملة',
    subtitleEn: 'Coming soon — complete bedroom suites',
    enabled: false,
  },
  {
    id: 'kids',
    titleAr: 'الأطفال والشباب',
    titleEn: 'Kids & Youth',
    subtitleAr: 'قريبًا — غرف أطفال وشباب',
    subtitleEn: 'Coming soon — kids and youth rooms',
    enabled: false,
  },
];

const COPY: Record<Language, {
  navJourney: string;
  navContact: string;
  scroll: string;
  hero: ChapterCopy;
  gate: ChapterCopy;
  modernHall: ChapterCopy;
  classicHall: ChapterCopy;
  roomGate: ChapterCopy;
  chooseDepartment: string;
  modern: string;
  modernHint: string;
  classic: string;
  classicHint: string;
  selected: string;
  change: string;
  enter: string;
  comingSoon: string;
  contactTitle: string;
  contactBody: string;
  facebook: string;
}> = {
  ar: {
    navJourney: 'رحلة القصر',
    navContact: 'تواصل معنا',
    scroll: 'مرّر للاقتراب من القصر',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'قصر قبيصة الافتراضي',
      body: 'ابدأ من الخارج. كل تمريرة تقرّبك من المدخل حتى تصل إلى بوابة القصر وتختار العالم الذي تريد دخوله.',
    },
    gate: {
      eyebrow: 'البوابة الرئيسية',
      title: 'أي جناح تريد أن ندخله أولًا؟',
      body: 'هنا تتفرع الرحلة. اختر المودرن أو الكلاسيكي، وبعد الاختيار سيكمل القصر معك داخل هول خاص بالقسم الذي اخترته.',
    },
    modernHall: {
      eyebrow: 'MODERN WING',
      title: 'دخلت جناح المودرن',
      body: 'استمر في التمرير. الكاميرا تتحرك معك داخل الهول وتبدأ الغرف في الظهور أمامك بدل أن تختار من قائمة تقليدية.',
    },
    classicHall: {
      eyebrow: 'NEO-CLASSICAL WING',
      title: 'دخلت جناح الكلاسيك',
      body: 'استمر في التمرير عبر الهول الكلاسيكي حتى تصل إلى مداخل الغرف والصالونات المتاحة للاستكشاف.',
    },
    roomGate: {
      eyebrow: 'اختر الغرفة',
      title: 'أي جزء تريد الدخول إليه؟',
      body: 'الآن أنت داخل الجناح. اختر الغرفة التي تريد دخولها؛ الغرفة الجاهزة تفتح كتجربة تفاعلية، وباقي الغرف ستضاف تباعًا.',
    },
    chooseDepartment: 'اختر الجناح',
    modern: 'مودرن',
    modernHint: 'منحنيات ناعمة، ركنات ومعيشة عصرية',
    classic: 'كلاسيكي / نيو كلاسيك',
    classicHint: 'صالونات، حفر وتفاصيل شامبين فاخرة',
    selected: 'الجناح الحالي',
    change: 'تغيير الجناح',
    enter: 'دخول الغرفة',
    comingSoon: 'قريبًا',
    contactTitle: 'هل تريد معرفة المزيد؟',
    contactBody: 'سنربط الأسعار والمواصفات وبيانات التواصل النهائية من مصادر قبيصة الموثقة فقط. أي نموذج غير موثق يظهر كسعر عند الطلب.',
    facebook: 'صفحة قبيصة على فيسبوك',
  },
  en: {
    navJourney: 'Palace Journey',
    navContact: 'Contact',
    scroll: 'Scroll toward the palace',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'Qubaisa Virtual Palace',
      body: 'Begin outside. Every scroll brings you closer to the entrance until you reach the palace gate and choose the world you want to enter.',
    },
    gate: {
      eyebrow: 'MAIN GATE',
      title: 'Which wing would you like to enter first?',
      body: 'The journey branches here. Choose Modern or Neo-Classical and the palace continues into a hall dedicated to your selection.',
    },
    modernHall: {
      eyebrow: 'MODERN WING',
      title: 'You entered the Modern wing',
      body: 'Keep scrolling. The camera travels through the hall as room entrances gradually reveal themselves instead of appearing as a conventional menu.',
    },
    classicHall: {
      eyebrow: 'NEO-CLASSICAL WING',
      title: 'You entered the Neo-Classical wing',
      body: 'Continue through the classical hall until the available room and salon entrances are revealed.',
    },
    roomGate: {
      eyebrow: 'CHOOSE A ROOM',
      title: 'Where would you like to go next?',
      body: 'You are now inside the wing. Choose a room; completed rooms open as interactive spaces while the remaining rooms will be added progressively.',
    },
    chooseDepartment: 'Choose a wing',
    modern: 'Modern',
    modernHint: 'Soft curves, sectionals and contemporary living',
    classic: 'Neo-Classical',
    classicHint: 'Salons, carving and champagne detailing',
    selected: 'Current wing',
    change: 'Change wing',
    enter: 'Enter room',
    comingSoon: 'Coming soon',
    contactTitle: 'Want to know more?',
    contactBody: 'Final prices, specifications and contact data will only be connected from verified Qubaisa sources. Unverified display pieces show price on request.',
    facebook: 'Qubaisa on Facebook',
  },
};

export default function App() {
  const language = useAppStore((state) => state.language) as Language;
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [department, setDepartment] = useState<Department | null>(null);
  const [interactiveRoom, setInteractiveRoom] = useState<InteractiveRoom | null>(null);
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const journeyEnd = document.getElementById('room-gate');
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

  const enterRoom = (room: RoomKey) => {
    if (room !== 'living' || !department) return;
    setInteractiveRoom(department === 'modern' ? 'modern' : 'classic');
  };

  const hallCopy = department === 'classic' ? copy.classicHall : copy.modernHall;
  const departmentLabel = department === 'classic' ? copy.classic : copy.modern;
  const roomOptions = useMemo(() => ROOM_OPTIONS, []);

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

      <section id="top" className="story-chapter story-hero" data-chapter="hero">
        <Chapter copy={copy.hero} align={language === 'ar' ? 'right' : 'left'} hero />
        <div className="scroll-cue"><span>{copy.scroll}</span><i /></div>
      </section>

      <section id="gate" className="story-chapter journey-gate" data-chapter="gate">
        <div className="journey-gate__copy">
          <Chapter copy={copy.gate} align={language === 'ar' ? 'right' : 'left'} />
          <span className="journey-step-label">02 — {copy.chooseDepartment}</span>
        </div>
        <div className="department-choice" role="group" aria-label={copy.chooseDepartment}>
          <button type="button" className={department === 'modern' ? 'is-selected' : ''} onClick={() => selectDepartment('modern')}>
            <span>01</span>
            <strong>{copy.modern}</strong>
            <small>{copy.modernHint}</small>
            <i aria-hidden="true">→</i>
          </button>
          <button type="button" className={department === 'classic' ? 'is-selected' : ''} onClick={() => selectDepartment('classic')}>
            <span>02</span>
            <strong>{copy.classic}</strong>
            <small>{copy.classicHint}</small>
            <i aria-hidden="true">→</i>
          </button>
        </div>
      </section>

      {department && (
        <>
          <section id="department-hall" className="story-chapter department-hall" data-chapter="hall">
            <div className="department-current">
              <span>{copy.selected}</span>
              <strong>{departmentLabel}</strong>
              <button type="button" onClick={() => setDepartment(null)}>{copy.change}</button>
            </div>
            <Chapter copy={hallCopy} align={language === 'ar' ? 'left' : 'right'} />
          </section>

          <section id="room-gate" className="story-chapter room-gate" data-chapter="rooms">
            <div className="room-gate__intro">
              <Chapter copy={copy.roomGate} align={language === 'ar' ? 'right' : 'left'} />
            </div>
            <div className="room-choice-grid">
              {roomOptions.map((room, index) => (
                <button
                  type="button"
                  key={room.id}
                  className={`room-choice-card ${room.enabled ? 'is-ready' : 'is-coming'}`}
                  disabled={!room.enabled}
                  onClick={() => enterRoom(room.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{language === 'ar' ? room.titleAr : room.titleEn}</strong>
                  <small>{language === 'ar' ? room.subtitleAr : room.subtitleEn}</small>
                  <em>{room.enabled ? copy.enter : copy.comingSoon}</em>
                </button>
              ))}
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
