import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { products } from '../data/products';

export type InteractiveRoom = 'modern' | 'classic';

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

const ROOM_VIEWS: Record<InteractiveRoom, Viewpoint[]> = {
  modern: [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2.0, 8.6], target: [0, 1.0, -3.5] },
    { labelAr: 'وسط الغرفة', labelEn: 'Center', position: [-4.7, 1.75, 2.0], target: [0, 1.0, -3.5] },
    { labelAr: 'تفاصيل الكنبة', labelEn: 'Sofa detail', position: [2.8, 1.55, 1.3], target: [0, 1.0, -4.2] },
  ],
  classic: [
    { labelAr: 'المدخل', labelEn: 'Entrance', position: [0, 2.0, 8.8], target: [0, 1.0, -3.4] },
    { labelAr: 'وسط الصالون', labelEn: 'Salon center', position: [-4.6, 1.8, 1.9], target: [0, 1.15, -3.5] },
    { labelAr: 'تفاصيل الصالون', labelEn: 'Salon detail', position: [3.5, 1.65, 0.7], target: [0, 1.2, -4.0] },
  ],
};

function RoomCamera({ room, viewIndex }: { room: InteractiveRoom; viewIndex: number }) {
  const controlsRef = useRef<any>(null);
  const views = ROOM_VIEWS[room];
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
      truckSpeed={0.6}
      dollySpeed={0.35}
      smoothTime={0.65}
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
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
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

function RoomScene({ room, language, onOpenProduct }: { room: InteractiveRoom; language: 'ar' | 'en'; onOpenProduct: (id: string) => void }) {
  const productId = room === 'modern' ? 'sofa-modern-01' : 'salon-classic-01';
  return (
    <>
      <color attach="background" args={[room === 'modern' ? '#151413' : '#17120e']} />
      <ambientLight intensity={0.34} color="#ffe8ca" />
      <hemisphereLight args={['#fff0da', '#1b1510', 0.58]} />
      <directionalLight position={[8, 13, 9]} intensity={1.25} color="#ffe2b6" castShadow shadow-mapSize={[1024, 1024]} />
      {room === 'modern' ? <ModernLiving /> : <NeoClassicLiving />}
      <PriceHotspot
        productId={productId}
        position={room === 'modern' ? [0, 2.25, -4.6] : [0, 2.6, -5.2]}
        language={language}
        onOpen={onOpenProduct}
      />
    </>
  );
}

export function InteractiveRoomExperience({ room, language, onClose }: Props) {
  const [viewIndex, setViewIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const views = ROOM_VIEWS[room];
  const roomTitle = room === 'modern'
    ? (language === 'ar' ? 'المعيشة المودرن' : 'Modern Living')
    : (language === 'ar' ? 'الصالونات والنيو كلاسيك' : 'Neo-Classical Salon');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    setViewIndex(0);
    setSelectedProductId(null);
  }, [room]);

  const selectedProduct = selectedProductId ? products[selectedProductId] : null;
  const displayedPrice = useMemo(() => {
    if (!selectedProduct) return '';
    if (!selectedProduct.priceEgp) return language === 'ar' ? 'السعر عند الطلب' : 'Price on request';
    return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-EG', {
      style: 'currency', currency: 'EGP', maximumFractionDigits: 0,
    }).format(selectedProduct.priceEgp);
  }, [language, selectedProduct]);

  return (
    <section className="interactive-room" aria-label={roomTitle}>
      <div className="interactive-room__topbar">
        <button type="button" className="room-back" onClick={onClose}>
          <span aria-hidden="true">←</span>
          {language === 'ar' ? 'العودة للقصر' : 'Back to palace'}
        </button>
        <div className="room-title">
          <span>{language === 'ar' ? 'قصر قبيصة الافتراضي' : 'Qubaisa Virtual Palace'}</span>
          <strong>{roomTitle}</strong>
        </div>
        <div className="room-hint">{language === 'ar' ? 'اسحب للنظر حولك' : 'Drag to look around'}</div>
      </div>

      <div className="interactive-room__canvas">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: views[0].position, fov: 48, near: 0.1, far: 80 }}
          gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 0.96;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <Suspense fallback={null}>
            <RoomCamera room={room} viewIndex={viewIndex} />
            <RoomScene room={room} language={language} onOpenProduct={setSelectedProductId} />
          </Suspense>
        </Canvas>
      </div>

      <nav className="room-viewpoints" aria-label={language === 'ar' ? 'نقاط التجول داخل الغرفة' : 'Room viewpoints'}>
        {views.map((view, index) => (
          <button
            type="button"
            key={`${room}-${index}`}
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
          <button type="button" className="product-sheet-close" onClick={() => setSelectedProductId(null)} aria-label={language === 'ar' ? 'إغلاق' : 'Close'}>×</button>
          <span>{selectedProduct.dataStatus === 'verified' ? (language === 'ar' ? 'منتج موثق' : 'Verified product') : (language === 'ar' ? 'نموذج عرض استرشادي' : 'Display proxy')}</span>
          <h2>{language === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}</h2>
          <strong className="product-sheet-price">{displayedPrice}</strong>
          <p>{language === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}</p>
          <button type="button" className="product-inquiry" disabled={!selectedProduct.inquiryEnabled}>
            {language === 'ar' ? 'استفسر عن القطعة' : 'Ask about this piece'}
          </button>
        </aside>
      )}
    </section>
  );
}
