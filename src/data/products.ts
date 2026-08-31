export interface ProductDefinition {
  id: string;
  dataStatus: 'verified' | 'proxy';
  nameAr: string;
  nameEn: string;
  category: string;
  style: 'modern' | 'neo-classic';
  descriptionAr: string;
  descriptionEn: string;
  dimensionsAr?: string;
  dimensionsEn?: string;
  materialsAr?: string[];
  materialsEn?: string[];
  colorsAr?: string[];
  colorsEn?: string[];
  /**
   * Only populate when the price has been verified by Qubaisa.
   * Proxy/display products intentionally leave this undefined and render
   * "Price on request" rather than inventing a commercial price.
   */
  priceEgp?: number;
  inquiryEnabled: boolean;
}

export const products: Record<string, ProductDefinition> = {
  'sofa-modern-01': {
    id: 'sofa-modern-01',
    dataStatus: 'proxy',
    nameAr: 'طقم انتريه مودرن كيرف',
    nameEn: 'Curved Modern Sofa Set',
    category: 'living',
    style: 'modern',
    descriptionAr: 'طقم انتريه مودرن بتصميم منحني عصري، يوفر راحة استثنائية مع مظهر أنيق وفخم يناسب المساحات الحديثة. (نموذج استرشادي)',
    descriptionEn: 'Modern curved sofa set providing exceptional comfort with an elegant and luxurious appearance suited for modern spaces. (Proxy Model)',
    dimensionsAr: 'نموذج - 320سم x 180سم x 85سم',
    dimensionsEn: 'Proxy - 320cm x 180cm x 85cm',
    materialsAr: ['قماش بوكليه (Boucle)', 'خشب زان أحمر', 'اسفنج عالي الكثافة'],
    materialsEn: ['Boucle Fabric', 'Red Beech Wood', 'High-Density Foam'],
    colorsAr: ['بيج', 'أوف وايت', 'رمادي فاتح'],
    colorsEn: ['Beige', 'Off-White', 'Light Grey'],
    inquiryEnabled: true,
  },
  'salon-classic-01': {
    id: 'salon-classic-01',
    dataStatus: 'proxy',
    nameAr: 'صالون نيو كلاسيك مذهب',
    nameEn: 'Gilded Neo-Classic Salon',
    category: 'salon',
    style: 'neo-classic',
    descriptionAr: 'صالون نيو كلاسيك فاخر مع تفاصيل محفورة بدقة وطلاء ذهبي فاتح (شامبين)، يجمع بين فخامة الماضي وعملية الحاضر. (نموذج استرشادي)',
    descriptionEn: 'Luxurious neo-classic salon with delicately carved details and champagne gold finish, combining past luxury with present practicality. (Proxy Model)',
    dimensionsAr: 'نموذج - كنبة 3 مقاعد + كنبة 2 مقعد + 2 فوتيه',
    dimensionsEn: 'Proxy - 3-Seater + 2-Seater + 2 Armchairs',
    materialsAr: ['خشب زان محفور', 'قماش قطيفة فاخر', 'ورق ذهب شامبين'],
    materialsEn: ['Carved Beech Wood', 'Premium Velvet', 'Champagne Gold Leaf'],
    colorsAr: ['كريمي', 'كشمير', 'كحلي'],
    colorsEn: ['Cream', 'Cashmere', 'Navy'],
    inquiryEnabled: true,
  },
  'dining-modern-01': {
    id: 'dining-modern-01',
    dataStatus: 'proxy',
    nameAr: 'غرفة سفرة مودرن ماربل',
    nameEn: 'Modern Marble Dining Room',
    category: 'dining',
    style: 'modern',
    descriptionAr: 'غرفة سفرة مودرن مع سطح طاولة شبيه بالرخام وكراسي منجدة بشكل أنيق. (نموذج استرشادي)',
    descriptionEn: 'Modern dining room with a marble-like tabletop and elegantly upholstered chairs. (Proxy Model)',
    dimensionsAr: 'نموذج - طاولة 220سم + 8 كراسي + بوفيه',
    dimensionsEn: 'Proxy - 220cm Table + 8 Chairs + Buffet',
    materialsAr: ['خشب هندسي', 'قماش كتان', 'سطح بورسلين'],
    materialsEn: ['Engineered Wood', 'Linen Fabric', 'Porcelain Top'],
    inquiryEnabled: true,
  },
  'dining-classic-01': {
    id: 'dining-classic-01',
    dataStatus: 'proxy',
    nameAr: 'غرفة سفرة نيو كلاسيك ملكية',
    nameEn: 'Royal Neo-Classic Dining Room',
    category: 'dining',
    style: 'neo-classic',
    descriptionAr: 'غرفة سفرة نيو كلاسيك بلمسات حفر يدوي وتنجيد فاخر للكراسي. (نموذج استرشادي)',
    descriptionEn: 'Neo-classic dining room with hand-carved touches and premium chair upholstery. (Proxy Model)',
    dimensionsAr: 'نموذج - طاولة 240سم + 8 كراسي + نيش',
    dimensionsEn: 'Proxy - 240cm Table + 8 Chairs + Vitrine',
    materialsAr: ['خشب زان', 'قماش جاكار', 'زجاج محفور'],
    materialsEn: ['Beech Wood', 'Jacquard Fabric', 'Carved Glass'],
    inquiryEnabled: true,
  },
  'bedroom-modern-01': {
    id: 'bedroom-modern-01',
    dataStatus: 'proxy',
    nameAr: 'غرفة نوم مودرن مينيامال',
    nameEn: 'Minimal Modern Bedroom',
    category: 'bedroom',
    style: 'modern',
    descriptionAr: 'غرفة نوم مودرن بتصميم هادئ وبسيط، مع إضاءة مخفية مدمجة. (نموذج استرشادي)',
    descriptionEn: 'Modern bedroom with a calm and simple design, featuring integrated hidden lighting. (Proxy Model)',
    dimensionsAr: 'نموذج - سرير 180سم + 2 كومود + دولاب',
    dimensionsEn: 'Proxy - 180cm Bed + 2 Nightstands + Wardrobe',
    materialsAr: ['خشب مصنع', 'قماش شمواه', 'إضاءة LED'],
    materialsEn: ['Manufactured Wood', 'Suede Fabric', 'LED Lighting'],
    inquiryEnabled: true,
  },
  'bedroom-classic-01': {
    id: 'bedroom-classic-01',
    dataStatus: 'proxy',
    nameAr: 'غرفة نوم نيو كلاسيك فلورنس',
    nameEn: 'Florence Neo-Classic Bedroom',
    category: 'bedroom',
    style: 'neo-classic',
    descriptionAr: 'غرفة نوم نيو كلاسيك تتميز بلوح رأس كابيتونيه فخم ومقابض كلاسيكية. (نموذج استرشادي)',
    descriptionEn: 'Neo-classic bedroom featuring a luxurious tufted headboard and classic handles. (Proxy Model)',
    dimensionsAr: 'نموذج - سرير 180سم + تسريحة فاخرة + دولاب',
    dimensionsEn: 'Proxy - 180cm Bed + Luxury Dresser + Wardrobe',
    materialsAr: ['خشب طبيعي', 'تنجيد كابيتونيه', 'طلاء دوكو'],
    materialsEn: ['Natural Wood', 'Tufted Upholstery', 'Duco Paint'],
    inquiryEnabled: true,
  },
  'kids-room-01': {
    id: 'kids-room-01',
    dataStatus: 'proxy',
    nameAr: 'غرفة شبابية / أطفال سمارت',
    nameEn: 'Smart Kids & Youth Room',
    category: 'kids',
    style: 'modern',
    descriptionAr: 'غرفة نوم للشباب والأطفال توفر مساحة للدراسة واللعب والنوم بأسلوب عصري. (نموذج استرشادي)',
    descriptionEn: 'Youth and kids bedroom providing space for study, play, and sleep in a modern style. (Proxy Model)',
    dimensionsAr: 'نموذج - سرير 120سم + مكتب + دولاب درفتين',
    dimensionsEn: 'Proxy - 120cm Bed + Desk + 2-Door Wardrobe',
    materialsAr: ['أخشاب متينة', 'دهانات آمنة', 'تصميم مدمج'],
    materialsEn: ['Durable Woods', 'Safe Paints', 'Compact Design'],
    inquiryEnabled: true,
  }
};
