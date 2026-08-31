export type Department = 'modern' | 'classic';
export type RoomKey = 'living' | 'dining' | 'bedroom' | 'kids';
export type RoomAvailability = 'ready' | 'preview' | 'hidden';

export type JourneyRoom = {
  id: RoomKey;
  order: number;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  availability: RoomAvailability;
};

export const DEPARTMENT_COPY: Record<Department, {
  titleAr: string;
  titleEn: string;
  eyebrow: string;
  hintAr: string;
  hintEn: string;
}> = {
  modern: {
    titleAr: 'مودرن',
    titleEn: 'Modern',
    eyebrow: 'MODERN WING',
    hintAr: 'خطوط معاصرة، خامات هادئة ومساحات معيشة مريحة',
    hintEn: 'Contemporary lines, calm materials and comfortable living spaces',
  },
  classic: {
    titleAr: 'نيو كلاسيك',
    titleEn: 'Neo-Classical',
    eyebrow: 'NEO-CLASSICAL WING',
    hintAr: 'تفاصيل راقية، رخام ولمسات شامبين محسوبة',
    hintEn: 'Refined detailing, marble and restrained champagne accents',
  },
};

const MODERN_ROOMS: JourneyRoom[] = [
  {
    id: 'living', order: 1,
    titleAr: 'المعيشة', titleEn: 'Living',
    subtitleAr: 'غرفة تفاعلية جاهزة — تجول وشاهد القطع والتفاصيل',
    subtitleEn: 'Interactive room ready — explore furniture and details',
    availability: 'ready',
  },
  {
    id: 'dining', order: 2,
    titleAr: 'السفرة', titleEn: 'Dining',
    subtitleAr: 'معاينة من الهول — النسخة الكاملة قيد التجهيز',
    subtitleEn: 'Hall preview — full room is being prepared',
    availability: 'preview',
  },
  {
    id: 'bedroom', order: 3,
    titleAr: 'غرف النوم', titleEn: 'Bedrooms',
    subtitleAr: 'معاينة من الهول — النسخة الكاملة قيد التجهيز',
    subtitleEn: 'Hall preview — full room is being prepared',
    availability: 'preview',
  },
  {
    id: 'kids', order: 4,
    titleAr: 'الأطفال والشباب', titleEn: 'Kids & Youth',
    subtitleAr: 'معاينة من الهول — النسخة الكاملة قيد التجهيز',
    subtitleEn: 'Hall preview — full room is being prepared',
    availability: 'preview',
  },
];

const CLASSIC_ROOMS: JourneyRoom[] = [
  {
    id: 'living', order: 1,
    titleAr: 'الصالونات', titleEn: 'Salons',
    subtitleAr: 'غرفة تفاعلية جاهزة — تجول وشاهد القطع والتفاصيل',
    subtitleEn: 'Interactive room ready — explore furniture and details',
    availability: 'ready',
  },
  {
    id: 'dining', order: 2,
    titleAr: 'السفرة', titleEn: 'Dining',
    subtitleAr: 'معاينة من الهول — النسخة الكاملة قيد التجهيز',
    subtitleEn: 'Hall preview — full room is being prepared',
    availability: 'preview',
  },
  {
    id: 'bedroom', order: 3,
    titleAr: 'غرف النوم', titleEn: 'Bedrooms',
    subtitleAr: 'معاينة من الهول — النسخة الكاملة قيد التجهيز',
    subtitleEn: 'Hall preview — full room is being prepared',
    availability: 'preview',
  },
];

export function getRoomsForDepartment(department: Department): JourneyRoom[] {
  return department === 'modern' ? MODERN_ROOMS : CLASSIC_ROOMS;
}

export function isRoomReady(room: JourneyRoom) {
  return room.availability === 'ready';
}
