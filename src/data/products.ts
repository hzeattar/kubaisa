export interface ProductDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  style: 'modern' | 'neo-classic';
  descriptionAr: string;
  descriptionEn: string;
  dimensions: string;
  materials: string[];
  colors: string[];
  inquiryEnabled: boolean;
}

export const products: Record<string, ProductDefinition> = {
  'sofa-modern-01': {
    id: 'sofa-modern-01',
    nameAr: 'طقم انتريه مودرن كيرف',
    nameEn: 'Curved Modern Sofa Set',
    category: 'living',
    style: 'modern',
    descriptionAr: 'طقم انتريه مودرن بتصميم منحني عصري، يوفر راحة استثنائية مع مظهر أنيق وفخم يناسب المساحات الحديثة.',
    descriptionEn: 'Modern curved sofa set providing exceptional comfort with an elegant and luxurious appearance suited for modern spaces.',
    dimensions: '320cm x 180cm x 85cm',
    materials: ['قماش بوكليه (Boucle)', 'خشب زان أحمر', 'اسفنج عالي الكثافة'],
    colors: ['بيج', 'أوف وايت', 'رمادي فاتح'],
    inquiryEnabled: true,
  },
  'salon-classic-01': {
    id: 'salon-classic-01',
    nameAr: 'صالون نيو كلاسيك مذهب',
    nameEn: 'Gilded Neo-Classic Salon',
    category: 'salon',
    style: 'neo-classic',
    descriptionAr: 'صالون نيو كلاسيك فاخر مع تفاصيل محفورة بدقة وطلاء ذهبي فاتح (شامبين)، يجمع بين فخامة الماضي وعملية الحاضر.',
    descriptionEn: 'Luxurious neo-classic salon with delicately carved details and champagne gold finish, combining past luxury with present practicality.',
    dimensions: 'كنبة 3 مقاعد + كنبة 2 مقعد + 2 فوتيه',
    materials: ['خشب زان محفور', 'قماش قطيفة فاخر', 'ورق ذهب شامبين'],
    colors: ['كريمي', 'كشمير', 'كحلي'],
    inquiryEnabled: true,
  }
};
