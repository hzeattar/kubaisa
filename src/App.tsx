/**
 * Qubaisa Virtual Palace — hybrid cinematic + interactive showroom.
 *
 * Scroll introduces the palace and carries the visitor through the arrival.
 * Once inside, the visitor chooses a department and enters an interactive
 * furniture room with guided viewpoints, free look and product price hotspots.
 */

import { useEffect, useMemo, useState } from 'react';
import { CinematicVisual } from './cinematic/CinematicVisual';
import { cinematicScroll } from './cinematic/scrollState';
import { InteractiveRoomExperience, type InteractiveRoom } from './interactive/InteractiveRoomExperience';
import './interactive/interactive.css';
import { useAppStore } from './stores/useAppStore';

type Language = 'ar' | 'en';

type ChapterCopy = {
  eyebrow: string;
  title: string;
  body: string;
};

const COPY: Record<Language, {
  navCollections: string;
  navContact: string;
  scroll: string;
  chooseDepartment: string;
  chooseDepartmentBody: string;
  enter: string;
  hero: ChapterCopy;
  entrance: ChapterCopy;
  modern: ChapterCopy;
  classic: ChapterCopy;
  craft: ChapterCopy;
  collectionsTitle: string;
  collectionsBody: string;
  modernCard: string;
  classicCard: string;
  diningCard: string;
  bedroomCard: string;
  comingSoon: string;
  contactTitle: string;
  contactBody: string;
  facebook: string;
}> = {
  ar: {
    navCollections: 'الأقسام',
    navContact: 'تواصل معنا',
    scroll: 'مرّر للدخول إلى قصر قبيصة',
    chooseDepartment: 'اختر جناحك',
    chooseDepartmentBody: 'من بهو القصر يمكنك الدخول مباشرة إلى الجناح الذي تريد استكشافه.',
    enter: 'دخول الجناح',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'قبيصة — الأثاث كما يجب أن يُعاش',
      body: 'ابدأ من واجهة القصر، ادخل إلى البهو، ثم اختر القسم وتجول داخل الغرفة نفسها وشاهد القطع وأسعارها.',
    },
    entrance: {
      eyebrow: 'قصر قبيصة الافتراضي',
      title: 'أنت الآن داخل البهو',
      body: 'اختر الجناح الذي تريد زيارته. داخل كل غرفة يمكنك النظر حولك والانتقال بين نقاط التجول والضغط على القطع لمعرفة السعر والتفاصيل.',
    },
    modern: {
      eyebrow: 'MODERN COLLECTION',
      title: 'المعيشة المودرن',
      body: 'ادخل الجناح المودرن واستكشف تكوينات المعيشة والكنب والكراسي والطاولات من داخل الغرفة.',
    },
    classic: {
      eyebrow: 'NEO-CLASSICAL COLLECTION',
      title: 'الصالونات والنيو كلاسيك',
      body: 'تجول بين التكوينات الكلاسيكية الهادئة وتفاصيل الخشب والمعدن والرخام والقماش.',
    },
    craft: {
      eyebrow: 'CRAFT & MATERIAL',
      title: 'التفاصيل جزء من التجربة',
      body: 'كل قطعة قابلة للربط ببياناتها وسعرها الحقيقي وصورها وخاماتها فور توفر بيانات قبيصة الموثقة.',
    },
    collectionsTitle: 'اختر القسم',
    collectionsBody: 'يمكنك الدخول للأقسام المتاحة الآن، وسيتم إضافة السفرة وغرف النوم وباقي أدوار القصر بنفس نظام التجول التفاعلي.',
    modernCard: 'المعيشة المودرن',
    classicCard: 'الصالونات والنيو كلاسيك',
    diningCard: 'السفرة',
    bedroomCard: 'غرف النوم',
    comingSoon: 'قريبًا',
    contactTitle: 'هل تريد معرفة المزيد؟',
    contactBody: 'الأسعار النهائية وبيانات المنتجات يتم عرضها فقط عندما تكون موثقة من قبيصة. النماذج الحالية الاسترشادية لا تحصل على أسعار مخترعة.',
    facebook: 'صفحة قبيصة على فيسبوك',
  },
  en: {
    navCollections: 'Departments',
    navContact: 'Contact',
    scroll: 'Scroll to enter Qubaisa Palace',
    chooseDepartment: 'Choose your wing',
    chooseDepartmentBody: 'From the palace lobby, enter the department you want to explore.',
    enter: 'Enter wing',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'Furniture designed to be experienced',
      body: 'Arrive at the palace, enter the lobby, choose a department, then explore the room itself and discover product prices and details.',
    },
    entrance: {
      eyebrow: 'QUBAISA VIRTUAL PALACE',
      title: 'You are now inside the lobby',
      body: 'Choose a wing. Inside every room you can look around, move between curated viewpoints and select furniture to view pricing and details.',
    },
    modern: {
      eyebrow: 'MODERN COLLECTION',
      title: 'Modern Living',
      body: 'Enter the modern wing and explore sofas, lounge chairs and tables from inside the furnished room.',
    },
    classic: {
      eyebrow: 'NEO-CLASSICAL COLLECTION',
      title: 'Neo-Classical & Salons',
      body: 'Explore calm classical compositions and details in wood, metal, marble and upholstery.',
    },
    craft: {
      eyebrow: 'CRAFT & MATERIAL',
      title: 'Detail is part of the experience',
      body: 'Every piece can be connected to verified pricing, photography, materials and product data as soon as Qubaisa approves the information.',
    },
    collectionsTitle: 'Choose a department',
    collectionsBody: 'Enter the available wings now. Dining, bedrooms and the remaining palace floors will use the same interactive room system as they are completed.',
    modernCard: 'Modern Living',
    classicCard: 'Neo-Classical & Salons',
    diningCard: 'Dining',
    bedroomCard: 'Bedrooms',
    comingSoon: 'Coming soon',
    contactTitle: 'Want to know more?',
    contactBody: 'Final pricing and product data are shown only when verified by Qubaisa. Current proxy displays never receive invented commercial prices.',
    facebook: 'Qubaisa on Facebook',
  },
};

export default function App() {
  const language = useAppStore((state) => state.language) as Language;
  const setLanguage = useAppStore((state) => state.setLanguage);
  const [activeRoom, setActiveRoom] = useState<InteractiveRoom | null>(null);
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
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
  }, []);

  const collectionCards = useMemo(() => [
    { title: copy.modernCard, status: '01', enabled: true, room: 'modern' as InteractiveRoom },
    { title: copy.classicCard, status: '02', enabled: true, room: 'classic' as InteractiveRoom },
    { title: copy.diningCard, status: copy.comingSoon, enabled: false, room: null },
    { title: copy.bedroomCard, status: copy.comingSoon, enabled: false, room: null },
  ], [copy]);

  const enterRoom = (room: InteractiveRoom) => setActiveRoom(room);

  return (
    <main className="cinematic-site">
      <header className="cinematic-header" aria-label="Qubaisa navigation">
        <a href="#top" className="brand-mark" aria-label="Qubaisa home">
          <img src="/brand/qubaisa-logo.webp" alt="Qubaisa Furniture" />
        </a>
        <nav className="cinematic-nav" aria-label="Primary">
          <a href="#collections">{copy.navCollections}</a>
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
        <CinematicVisual />
        <div className="cinematic-grade" />
        <div className="cinematic-vignette" />
        <div className="cinematic-grain" />
      </div>

      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <section id="top" className="story-chapter story-hero" data-chapter="hero">
        <Chapter copy={copy.hero} align={language === 'ar' ? 'right' : 'left'} hero />
        <div className="scroll-cue"><span>{copy.scroll}</span><i /></div>
      </section>

      <section className="story-chapter" data-chapter="entrance">
        <div className="chapter-copy chapter-copy--right">
          <span className="chapter-eyebrow">{copy.entrance.eyebrow}</span>
          <h1>{copy.entrance.title}</h1>
          <p>{copy.entrance.body}</p>
          <div className="palace-directory" aria-label={copy.chooseDepartment}>
            <button type="button" onClick={() => enterRoom('modern')}>
              <span>01 · MODERN LIVING</span>
              <strong>{copy.modernCard}</strong>
            </button>
            <button type="button" onClick={() => enterRoom('classic')}>
              <span>02 · NEO-CLASSICAL</span>
              <strong>{copy.classicCard}</strong>
            </button>
          </div>
        </div>
      </section>

      <section className="story-chapter chapter-offset" data-chapter="modern">
        <Chapter copy={copy.modern} align={language === 'ar' ? 'left' : 'right'} />
      </section>

      <section className="story-chapter" data-chapter="classic">
        <Chapter copy={copy.classic} align={language === 'ar' ? 'right' : 'left'} />
      </section>

      <section className="story-chapter chapter-offset" data-chapter="craft">
        <Chapter copy={copy.craft} align={language === 'ar' ? 'left' : 'right'} />
      </section>

      <section id="collections" className="editorial-section collections-section">
        <div className="editorial-heading">
          <span>QUBAISA DEPARTMENTS</span>
          <h2>{copy.collectionsTitle}</h2>
          <p>{copy.collectionsBody}</p>
        </div>
        <div className="collection-grid">
          {collectionCards.map((card) => card.enabled && card.room ? (
            <button
              type="button"
              key={card.title}
              className="collection-card is-interactive"
              onClick={() => enterRoom(card.room!)}
            >
              <div className="collection-card__index">{card.status}</div>
              <h3>{card.title}</h3>
              <div className="collection-card__line" />
            </button>
          ) : (
            <article key={card.title} className="collection-card is-disabled">
              <div className="collection-card__index">{card.status}</div>
              <h3>{card.title}</h3>
              <div className="collection-card__line" />
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="cinematic-footer">
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

      {activeRoom && (
        <InteractiveRoomExperience room={activeRoom} language={language} onClose={() => setActiveRoom(null)} />
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
