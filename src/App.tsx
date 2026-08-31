/**
 * Qubaisa Virtual Palace — cinematic scroll experience
 *
 * The primary interaction is native vertical scrolling. The persistent cinematic
 * visual is directed by scroll progress; visitors never need game controls,
 * a joystick, or pointer-lock to understand the brand story.
 */

import { useEffect, useMemo } from 'react';
import { CinematicVisual } from './cinematic/CinematicVisual';
import { cinematicScroll } from './cinematic/scrollState';
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
    navCollections: 'المجموعات',
    navContact: 'تواصل معنا',
    scroll: 'مرّر لاكتشاف قبيصة',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'قبيصة — الأثاث كما يجب أن يُرى',
      body: 'تجربة بصرية هادئة تأخذك من واجهة قبيصة إلى تفاصيل المودرن والنيو كلاسيك بدون أي تحكم معقد.',
    },
    entrance: {
      eyebrow: 'قصر قبيصة الافتراضي',
      title: 'ادخل إلى عالم صُمم حول الأثاث',
      body: 'المشهد يتحرك مع التمرير بينما تظل أنت متحكمًا بالإيقاع. لا مشي افتراضي، لا أزرار ألعاب، فقط رحلة مصممة بعناية.',
    },
    modern: {
      eyebrow: 'MODERN COLLECTION',
      title: 'مودرن ناعم، منحنيات مريحة، حضور هادئ',
      body: 'مساحات معيشة معاصرة تركز على الراحة، النسب، الخامات الدافئة والتكوينات الواسعة.',
    },
    classic: {
      eyebrow: 'NEO-CLASSICAL COLLECTION',
      title: 'تفاصيل كلاسيكية بروح أكثر هدوءًا',
      body: 'حفر، خامات فاتحة، لمسات شامبين وتكوينات صالونات فاخرة بدون مبالغة بصرية.',
    },
    craft: {
      eyebrow: 'CRAFT & MATERIAL',
      title: 'القيمة تظهر في التفاصيل',
      body: 'القماش، الخشب، الرخام والمعدن هي ما يجب أن تقوده اللقطات القريبة؛ المنتج أولًا والمؤثرات ثانيًا.',
    },
    collectionsTitle: 'اكتشف المجموعات',
    collectionsBody: 'بعد الرحلة السينمائية يعود الموقع إلى واجهة واضحة وسريعة للوصول إلى أقسام الأثاث والتواصل.',
    modernCard: 'المعيشة المودرن',
    classicCard: 'الصالونات والنيو كلاسيك',
    diningCard: 'السفرة',
    bedroomCard: 'غرف النوم',
    comingSoon: 'قريبًا',
    contactTitle: 'هل تريد معرفة المزيد؟',
    contactBody: 'هذه النسخة تبني الأساس البصري والتقني. بيانات التواصل والمنتجات النهائية تُربط فقط من مصادر قبيصة الموثقة.',
    facebook: 'صفحة قبيصة على فيسبوك',
  },
  en: {
    navCollections: 'Collections',
    navContact: 'Contact',
    scroll: 'Scroll to discover Qubaisa',
    hero: {
      eyebrow: 'QUBAISA FURNITURE',
      title: 'Furniture, presented as an experience',
      body: 'A calm visual journey from the Qubaisa facade into modern and neo-classical collections — without game-like controls.',
    },
    entrance: {
      eyebrow: 'QUBAISA VIRTUAL PALACE',
      title: 'Enter a world built around furniture',
      body: 'The scene moves with your scroll while you control the pace. No virtual walking, no gaming HUD — only directed visual storytelling.',
    },
    modern: {
      eyebrow: 'MODERN COLLECTION',
      title: 'Soft geometry, generous comfort, quiet presence',
      body: 'Contemporary living compositions focused on comfort, proportion, warm materials and spacious layouts.',
    },
    classic: {
      eyebrow: 'NEO-CLASSICAL COLLECTION',
      title: 'Classical detail with a calmer expression',
      body: 'Carving, pale upholstery, champagne accents and luxurious salon compositions without visual excess.',
    },
    craft: {
      eyebrow: 'CRAFT & MATERIAL',
      title: 'Value lives in the details',
      body: 'Fabric, wood, marble and metal should lead the close-up moments. Product first; effects second.',
    },
    collectionsTitle: 'Explore the collections',
    collectionsBody: 'After the cinematic journey the experience resolves into a clear, fast path to furniture categories and contact.',
    modernCard: 'Modern Living',
    classicCard: 'Neo-Classical & Salons',
    diningCard: 'Dining',
    bedroomCard: 'Bedrooms',
    comingSoon: 'Coming soon',
    contactTitle: 'Want to know more?',
    contactBody: 'This build establishes the visual and technical foundation. Final contact and product data should only come from verified Qubaisa sources.',
    facebook: 'Qubaisa on Facebook',
  },
};

export default function App() {
  const language = useAppStore((state) => state.language) as Language;
  const setLanguage = useAppStore((state) => state.setLanguage);
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
    { title: copy.modernCard, status: '01', enabled: true },
    { title: copy.classicCard, status: '02', enabled: true },
    { title: copy.diningCard, status: copy.comingSoon, enabled: false },
    { title: copy.bedroomCard, status: copy.comingSoon, enabled: false },
  ], [copy]);

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

      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>

      <section id="top" className="story-chapter story-hero" data-chapter="hero">
        <Chapter copy={copy.hero} align={language === 'ar' ? 'right' : 'left'} hero />
        <div className="scroll-cue">
          <span>{copy.scroll}</span>
          <i />
        </div>
      </section>

      <section className="story-chapter" data-chapter="entrance">
        <Chapter copy={copy.entrance} align={language === 'ar' ? 'right' : 'left'} />
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
          <span>QUBAISA COLLECTIONS</span>
          <h2>{copy.collectionsTitle}</h2>
          <p>{copy.collectionsBody}</p>
        </div>
        <div className="collection-grid">
          {collectionCards.map((card) => (
            <article key={card.title} className={`collection-card ${card.enabled ? '' : 'is-disabled'}`}>
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
