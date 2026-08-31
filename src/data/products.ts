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
  }
};
