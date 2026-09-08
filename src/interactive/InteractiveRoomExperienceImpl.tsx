import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { products } from '../data/products';
import { AdaptiveRoomCanvas } from './AdaptiveRoomCanvas';

export type InteractiveRoom = {
  department: 'modern' | 'classic';
  room: 'living' | 'dining' | 'bedroom' | 'kids';
};

interface Props {
  room: InteractiveRoom;
  language: 'ar' | 'en';
  onClose: () => void;
}

type Viewpoint = {
  labelAr: string;
  labelEn: string;
  position: [number, number, number];
  target: [number, number, number];
};

const ROOM_VIEWS: Record<string, Viewpoint[]> = {
  'modern-living': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 8.6], target: [0, 1, -3.5] },
    { labelAr: 'وسط الغرفة', labelEn: 'Center', position: [-4.7, 1.75, 2], target: [0, 1, -3.5] },
    { labelAr: 'تفاصيل الكنبة', labelEn: 'Sofa detail', position: [2.8, 1.55, 1.3], target: [0, 1, -4.2] },
  ],
  'classic-living': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 8.8], target: [0, 1, -3.4] },
    { labelAr: 'وسط الصالون', labelEn: 'Salon center', position: [-4.6, 1.8, 1.9], target: [0, 1.15, -3.5] },
    { labelAr: 'تفاصيل الصالون', labelEn: 'Salon detail', position: [3.5, 1.65, 0.7], target: [0, 1.2, -4] },
  ],
  'modern-dining': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 7], target: [0, 1, -1] },
    { labelAr: 'مائدة السفرة', labelEn: 'Dining table', position: [-3, 2, 0], target: [0, 1, -1] },
  ],
  'classic-dining': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 7], target: [0, 1, -1] },
    { labelAr: 'مائدة السفرة', labelEn: 'Dining table', position: [-3, 2, 0], target: [0, 1, -1] },
  ],
  'modern-bedroom': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 7], target: [0, 1, -2.5] },
    { labelAr: 'السرير', labelEn: 'Bed view', position: [-3, 1.8, -1], target: [0, 1, -2.5] },
  ],
  'classic-bedroom': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 7], target: [0, 1, -2.5] },
    { labelAr: 'السرير', labelEn: 'Bed view', position: [-3, 1.8, -1], target: [0, 1, -2.5] },
  ],
  'modern-kids': [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2, 7], target: [0, 1, -2.5] },
    { labelAr: 'السرير', labelEn: 'Bed view', position: [-2, 1.5, 0], target: [-1.5, 1, -2.5] },
    { labelAr: 'المكتب', labelEn: 'Desk area', position: [2, 1.5, 0], target: [1.5, 1, -3] },
  ],
};

function RoomCamera({ room, viewIndex }: { room: InteractiveRoom; viewIndex: number }) {
  const controlsRef = useRef<any>(null);
  const key = `${room.department}-${room.room}`;
  const views = ROOM_VIEWS[key] || ROOM_VIEWS['modern-living'];
  const view = views[Math.min(viewIndex, views.length - 1)];

  useEffect(() => {
    controlsRef.current?.setLookAt(
      view.position[0], view.position[1], view.position[2],
      view.target[0], view.target[1], view.target[2],
      true,
    );
  }, [view]);

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      minDistance={2.3}
      maxDistance={12}
      minPolarAngle={Math.PI * 0.24}
      maxPolarAngle={Math.PI * 0.62}
      truckSpeed={0.28}
      dollySpeed={0.2}
      smoothTime={0.72}
    />
  );
}

function PriceHotspot({
  productId,
  position,
  language,
  onOpen,
}: {
  productId: string;
  position: [number, number, number];
  language: 'ar' | 'en';
  onOpen: (id: string) => void;
}) {
  const product = products[productId];
  if (!product) return null;

  const price = product.priceEgp
    ? new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG', {
        style: 'currency', currency: 'EGP', maximumFractionDigits: 0,
      }).format(product.priceEgp)
    : language === 'ar' ? 'السعر عند الطلب' : 'Price on request';

  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[20, 0]}>
      <button className="room-price-hotspot" type="button" onClick={() => onOpen(productId)}>
        <span>{language === 'ar' ? product.nameAr : product.nameEn}</span>
        <strong>{price}</strong>
        <i aria-hidden="true" />
      </button>
    </Html>
  );
}

import { ModernDining } from '../scenes/dining/modern/ModernDining';
import { NeoClassicDining } from '../scenes/dining/neoclassic/NeoClassicDining';
import { ModernBedroom } from '../scenes/bedroom/modern/ModernBedroom';
import { NeoClassicBedroom } from '../scenes/bedroom/neoclassic/NeoClassicBedroom';
// Kids room (only modern for now)
import { ModernKidsRoom } from '../scenes/bedroom/kids/ModernKidsRoom';

const SCENES: Record<string, React.FC> = {
  'modern-living': ModernLiving,
  'classic-living': NeoClassicLiving,
  'modern-dining': ModernDining,
  'classic-dining': NeoClassicDining,
  'modern-bedroom': ModernBedroom,
  'classic-bedroom': NeoClassicBedroom,
  'modern-kids': ModernKidsRoom,
  'classic-kids': ModernKidsRoom, // Fallback
};

const PRODUCT_IDS: Record<string, string> = {
  'modern-living': 'sofa-modern-01',
  'classic-living': 'salon-classic-01',
  'modern-dining': 'dining-modern-01',
  'classic-dining': 'dining-classic-01',
  'modern-bedroom': 'bedroom-modern-01',
  'classic-bedroom': 'bedroom-classic-01',
  'modern-kids': 'kids-room-01',
  'classic-kids': 'kids-room-01',
};

const HOTSPOT_POSITIONS: Record<string, [number, number, number]> = {
  'modern-living': [0, 2.25, -4.6],
  'classic-living': [0, 2.6, -5.2],
  'modern-dining': [0, 2.0, -1],
  'classic-dining': [0, 2.0, -1],
  'modern-bedroom': [0, 2.0, -2],
  'classic-bedroom': [0, 2.0, -2],
  'modern-kids': [0, 2.0, -2],
  'classic-kids': [0, 2.0, -2],
};

function RoomScene({
  room,
  language,
  onOpenProduct,
}: {
  room: InteractiveRoom;
  language: 'ar' | 'en';
  onOpenProduct: (id: string) => void;
}) {
  const classic = room.department === 'classic';
  const key = `${room.department}-${room.room}`;
  const SceneComponent = SCENES[key] || SCENES['modern-living'];
  const productId = PRODUCT_IDS[key] || PRODUCT_IDS['modern-living'];
  const hotspotPos = HOTSPOT_POSITIONS[key] || HOTSPOT_POSITIONS['modern-living'];

  return (
    <>
      <color attach="background" args={[classic ? '#17120e' : '#151413']} />
      <ambientLight intensity={0.25} color="#ffe8ca" />
      <hemisphereLight args={['#fff0da', '#1b1510', 0.46]} />
      <directionalLight
        position={[8, 13, 9]}
        intensity={1.08}
        color="#ffe2b6"
        castShadow
        shadow-bias={-0.00035}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <SceneComponent />
      <PriceHotspot productId={productId} position={hotspotPos} language={language} onOpen={onOpenProduct} />
    </>
  );
}

import { getRoomsForDepartment } from '../journey/journeyModel';

export default function InteractiveRoomExperienceImpl({ room, language, onClose }: Props) {
  const [viewIndex, setViewIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const lastWheelAt = useRef(0);
  const closeTimer = useRef<number | null>(null);
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const key = `${room.department}-${room.room}`;
  const views = ROOM_VIEWS[key] || ROOM_VIEWS['modern-living'];

  const roomConfig = getRoomsForDepartment(room.department).find((r) => r.id === room.room);
  const roomTitle = roomConfig 
    ? (language === 'ar' ? roomConfig.titleAr : roomConfig.titleEn) 
    : (language === 'ar' ? 'غرفة تفاعلية' : 'Interactive Room');

  const moveView = (direction: 1 | -1) => {
    if (selectedProductId || isClosing) return;
    setViewIndex((current) => THREE.MathUtils.clamp(current + direction, 0, views.length - 1));
  };

  const requestClose = () => {
    if (isClosing) return;
    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      onClose();
      return;
    }

    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, 340);
  };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    setViewIndex(0);
    setSelectedProductId(null);
    setIsClosing(false);
  }, [room]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        moveView(1);
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        moveView(-1);
      }
      if (event.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaY) < 18 || selectedProductId || isClosing) return;
    const now = performance.now();
    if (now - lastWheelAt.current < 620) return;
    lastWheelAt.current = now;
    moveView(event.deltaY > 0 ? 1 : -1);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch' || isClosing) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId || selectedProductId || isClosing) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dy) < 46 || Math.abs(dy) < Math.abs(dx) * 1.28) return;
    moveView(dy < 0 ? 1 : -1);
  };

  const selectedProduct = selectedProductId ? products[selectedProductId] : null;
  const displayedPrice = useMemo(() => {
    if (!selectedProduct) return '';
    if (!selectedProduct.priceEgp) return language === 'ar' ? 'السعر عند الطلب' : 'Price on request';
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency', currency: 'EGP', maximumFractionDigits: 0,
    }).format(selectedProduct.priceEgp);
  }, [language, selectedProduct]);

  return (
    <section
      className={`interactive-room ${isClosing ? 'is-closing' : ''}`}
      aria-label={roomTitle}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <div className="room-entry-veil" aria-hidden="true">
        <span>QUBAISA FURNITURE</span>
        <strong>{roomTitle}</strong>
        <i />
      </div>

      <div className="interactive-room__topbar">
        <button type="button" className="room-back" onClick={requestClose}>
          <span aria-hidden="true">←</span>{language === 'ar' ? 'العودة للهول' : 'Back to hall'}
        </button>
        <div className="room-title">
          <span>{language === 'ar' ? 'قصر قبيصة الافتراضي' : 'Qubaisa Virtual Palace'}</span>
          <strong>{roomTitle}</strong>
        </div>
        <div className="room-hint">
          {language === 'ar' ? 'مرّر أو اسحب رأسيًا للمشي · اسحب أفقيًا للنظر' : 'Scroll / vertical swipe to move · drag to look'}
        </div>
      </div>

      <div className="interactive-room__canvas">
        <AdaptiveRoomCanvas cameraPosition={views[0].position}>
          <Suspense fallback={null}>
            <RoomCamera room={room} viewIndex={viewIndex} />
            <RoomScene room={room} language={language} onOpenProduct={setSelectedProductId} />
          </Suspense>
        </AdaptiveRoomCanvas>
      </div>

      <nav className="room-viewpoints" aria-label={language === 'ar' ? 'نقاط التجول داخل الغرفة' : 'Room viewpoints'}>
        {views.map((view, index) => (
          <button
            type="button"
            key={`${room.department}-${room.room}-${index}`}
            className={index === viewIndex ? 'is-active' : ''}
            onClick={() => setViewIndex(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {language === 'ar' ? view.labelAr : view.labelEn}
          </button>
        ))}
      </nav>

      {selectedProduct && (
        <aside className="room-product-sheet" aria-live="polite">
          <button
            type="button"
            className="product-sheet-close"
            onClick={() => setSelectedProductId(null)}
            aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
          >×</button>
          <span>
            {selectedProduct.dataStatus === 'verified'
              ? language === 'ar' ? 'منتج موثق' : 'Verified product'
              : language === 'ar' ? 'نموذج عرض استرشادي' : 'Display proxy'}
          </span>
          <h2>{language === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}</h2>
          <strong className="product-sheet-price">{displayedPrice}</strong>
          <p>{language === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}</p>
          <a 
            href={`https://wa.me/201000000000?text=${encodeURIComponent(language === 'ar' ? `مرحباً، أود الاستفسار عن القطعة: ${selectedProduct.nameAr}` : `Hello, I would like to inquire about: ${selectedProduct.nameEn}`)}`}
            target="_blank"
            rel="noreferrer"
            className={`product-inquiry ${!selectedProduct.inquiryEnabled ? 'is-disabled' : ''}`}
            onClick={(e) => { if (!selectedProduct.inquiryEnabled) e.preventDefault(); }}
          >
            {language === 'ar' ? 'استفسر عن القطعة' : 'Ask about this piece'}
          </a>
        </aside>
      )}
    </section>
  );
}
