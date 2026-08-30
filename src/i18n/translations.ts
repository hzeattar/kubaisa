export const translations = {
  ar: {
    loading: {
      title: 'قصر قبيصة الافتراضي',
      subtitle: 'جاري تجهيز المعرض...',
      enter: 'دخول المعرض',
    },
    ui: {
      explore: 'استكشف',
      guidedTour: 'جولة إرشادية',
      floorDirectory: 'دليل الطوابق',
      close: 'إغلاق',
      back: 'رجوع',
      quality: 'الجودة',
      qualityAuto: 'تلقائي',
      qualityHigh: 'عالية',
      qualityMedium: 'متوسطة',
      qualityLow: 'منخفضة',
    },
    floors: {
      lobby: 'بهو القصر',
      living: 'غرف المعيشة',
      dining: 'غرف السفرة',
      bedrooms: 'غرف النوم',
      kids: 'أطفال وشباب',
      studio: 'استوديو التصميم',
    },
    zones: {
      exterior: 'الخارج',
      lobby: 'الاستقبال',
      'living-modern': 'معيشة مودرن',
      'living-neoclassic': 'معيشة نيو كلاسيك',
    },
    product: {
      details: 'تفاصيل المنتج',
      dimensions: 'الأبعاد',
      materials: 'الخامات',
      colors: 'الألوان المتاحة',
      inquiry: 'استفسار عن المنتج',
      close: 'إغلاق',
    }
  },
  en: {
    loading: {
      title: 'Qubaisa Virtual Palace',
      subtitle: 'Preparing Showroom...',
      enter: 'Enter The Palace',
    },
    ui: {
      explore: 'Explore',
      guidedTour: 'Guided Tour',
      floorDirectory: 'Floor Directory',
      close: 'Close',
      back: 'Back',
      quality: 'Quality',
      qualityAuto: 'Auto',
      qualityHigh: 'High',
      qualityMedium: 'Medium',
      qualityLow: 'Low',
    },
    floors: {
      lobby: 'Grand Lobby',
      living: 'Living Rooms',
      dining: 'Dining Rooms',
      bedrooms: 'Bedrooms',
      kids: 'Kids & Youth',
      studio: 'Design Studio',
    },
    zones: {
      exterior: 'Exterior',
      lobby: 'Reception',
      'living-modern': 'Modern Living',
      'living-neoclassic': 'Neo-Classic Living',
    },
    product: {
      details: 'Product Details',
      dimensions: 'Dimensions',
      materials: 'Materials',
      colors: 'Available Colors',
      inquiry: 'Ask About This Set',
      close: 'Close',
    }
  }
};

export type TranslationKey = keyof typeof translations.ar;
