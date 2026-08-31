import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModernLiving } from '../scenes/living/modern/ModernLiving';
import { NeoClassicLiving } from '../scenes/living/neoclassic/NeoClassicLiving';
import { ModernDining } from '../scenes/dining/modern/ModernDining';
import { NeoClassicDining } from '../scenes/dining/neoclassic/NeoClassicDining';
import { ModernBedroom } from '../scenes/bedroom/modern/ModernBedroom';
import { NeoClassicBedroom } from '../scenes/bedroom/neoclassic/NeoClassicBedroom';
import { KidsRoom } from '../scenes/kids/KidsRoom';
import { products } from '../data/products';

export type InteractiveRoom = { department: 'modern' | 'classic'; room: 'living' | 'dining' | 'bedroom' | 'kids' };

interface Props { room: InteractiveRoom; language: 'ar' | 'en'; onClose: () => void; }
type Viewpoint = { labelAr:string; labelEn:string; position:[number,number,number]; target:[number,number,number] };

const ROOM_VIEWS: Record<string, Viewpoint[]> = {
  'modern-living': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.6],target:[0,1,-3.5]},
    {labelAr:'وسط الغرفة',labelEn:'Center',position:[-4.7,1.75,2],target:[0,1,-3.5]},
    {labelAr:'تفاصيل الكنبة',labelEn:'Sofa detail',position:[2.8,1.55,1.3],target:[0,1,-4.2]},
  ],
  'classic-living': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.8],target:[0,1,-3.4]},
    {labelAr:'وسط الصالون',labelEn:'Salon center',position:[-4.6,1.8,1.9],target:[0,1.15,-3.5]},
    {labelAr:'تفاصيل الصالون',labelEn:'Salon detail',position:[3.5,1.65,.7],target:[0,1.2,-4]},
  ],
  'modern-dining': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.6],target:[0,1,-1]},
    {labelAr:'الطاولة',labelEn:'Table',position:[-3,1.75,3],target:[0,1,-1]},
    {labelAr:'تفاصيل الكراسي',labelEn:'Chair details',position:[2,1.5,1.5],target:[-1,1,-1]},
  ],
  'classic-dining': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.8],target:[0,1,-1]},
    {labelAr:'وسط السفرة',labelEn:'Dining center',position:[-4,1.8,2.5],target:[0,1.1,-1]},
    {labelAr:'النيش',labelEn:'Vitrine',position:[3,1.6,1],target:[-1,1.2,-2]},
  ],
  'modern-bedroom': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.6],target:[0,1,-2]},
    {labelAr:'السرير',labelEn:'Bed',position:[-3.5,1.7,3],target:[0,1,-2]},
    {labelAr:'الدولاب',labelEn:'Wardrobe',position:[3,1.6,2],target:[-1,1,-3]},
  ],
  'classic-bedroom': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,2,8.8],target:[0,1,-2]},
    {labelAr:'السرير الفاخر',labelEn:'Luxury Bed',position:[-4,1.8,3],target:[0,1.1,-2]},
    {labelAr:'التسريحة',labelEn:'Dresser',position:[3.5,1.65,1.5],target:[-1,1.2,-2.5]},
  ],
  'modern-kids': [
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,1.8,8.6],target:[0,1,-1.5]},
    {labelAr:'منطقة اللعب',labelEn:'Play area',position:[-3,1.5,2.5],target:[0,0.8,-1.5]},
    {labelAr:'مكتب المذاكرة',labelEn:'Study desk',position:[2.5,1.6,2],target:[-1,1,-2]},
  ],
  'classic-kids': [ // Fallback if they choose classic kids
    {labelAr:'المدخل',labelEn:'Entrance',position:[0,1.8,8.6],target:[0,1,-1.5]},
    {labelAr:'وسط الغرفة',labelEn:'Room center',position:[-3,1.5,2.5],target:[0,0.8,-1.5]},
  ],
};

function RoomCamera({room,viewIndex}:{room:InteractiveRoom;viewIndex:number}){
  const controlsRef=useRef<any>(null); const key = `${room.department}-${room.room}`; const views=ROOM_VIEWS[key]; const view=views[Math.min(viewIndex,views.length-1)];
  useEffect(()=>{controlsRef.current?.setLookAt(view.position[0],view.position[1],view.position[2],view.target[0],view.target[1],view.target[2],true)},[view]);
  return <CameraControls ref={controlsRef} makeDefault minDistance={2.3} maxDistance={12} minPolarAngle={Math.PI*.24} maxPolarAngle={Math.PI*.62} truckSpeed={.35} dollySpeed={.25} smoothTime={.65}/>;
}

function PriceHotspot({productId,position,language,onOpen}:{productId:string;position:[number,number,number];language:'ar'|'en';onOpen:(id:string)=>void}){
  const product=products[productId]; if(!product)return null;
  const price=product.priceEgp?new Intl.NumberFormat(language==='ar'?'ar-EG':'en-EG',{style:'currency',currency:'EGP',maximumFractionDigits:0}).format(product.priceEgp):(language==='ar'?'السعر عند الطلب':'Price on request');
  return <Html position={position} center distanceFactor={8} zIndexRange={[20,0]}><button className="room-price-hotspot" type="button" onClick={()=>onOpen(productId)}><span>{language==='ar'?product.nameAr:product.nameEn}</span><strong>{price}</strong><i aria-hidden="true"/></button></Html>;
}

function RoomScene({room,language,onOpenProduct}:{room:InteractiveRoom;language:'ar'|'en';onOpenProduct:(id:string)=>void}){
  const key = `${room.department}-${room.room}`;
  let SceneComponent = ModernLiving;
  let productId = 'sofa-modern-01';
  let hotspotPos: [number,number,number] = [0,2.25,-4.6];

  switch (key) {
    case 'modern-living': SceneComponent = ModernLiving; productId = 'sofa-modern-01'; hotspotPos = [0,2.25,-4.6]; break;
    case 'classic-living': SceneComponent = NeoClassicLiving; productId = 'salon-classic-01'; hotspotPos = [0,2.6,-5.2]; break;
    case 'modern-dining': SceneComponent = ModernDining; productId = 'dining-modern-01'; hotspotPos = [0,2.2,-1]; break;
    case 'classic-dining': SceneComponent = NeoClassicDining; productId = 'dining-classic-01'; hotspotPos = [0,2.4,-1]; break;
    case 'modern-bedroom': SceneComponent = ModernBedroom; productId = 'bedroom-modern-01'; hotspotPos = [0,2.5,-2.5]; break;
    case 'classic-bedroom': SceneComponent = NeoClassicBedroom; productId = 'bedroom-classic-01'; hotspotPos = [0,2.8,-2.5]; break;
    case 'modern-kids': 
    case 'classic-kids': SceneComponent = KidsRoom; productId = 'kids-room-01'; hotspotPos = [0,2.0,-2]; break;
  }

  return <><color attach="background" args={[room.department==='modern'?'#151413':'#17120e']}/><ambientLight intensity={.34} color="#ffe8ca"/><hemisphereLight args={['#fff0da','#1b1510',.58]}/><directionalLight position={[8,13,9]} intensity={1.25} color="#ffe2b6" castShadow shadow-mapSize={[1024,1024]}/><SceneComponent/><PriceHotspot productId={productId} position={hotspotPos} language={language} onOpen={onOpenProduct}/></>;
}

export function InteractiveRoomExperience({room,language,onClose}:Props){
  const [viewIndex,setViewIndex]=useState(0); const [selectedProductId,setSelectedProductId]=useState<string|null>(null); const lastWheelAt=useRef(0); 
  const key = `${room.department}-${room.room}`;
  const views=ROOM_VIEWS[key] || ROOM_VIEWS['modern-living'];
  
  let roomTitle = '';
  if (language === 'ar') {
    if (room.room === 'living') roomTitle = room.department === 'modern' ? 'المعيشة المودرن' : 'الصالونات الكلاسيك';
    if (room.room === 'dining') roomTitle = room.department === 'modern' ? 'سفرة مودرن' : 'سفرة نيو كلاسيك';
    if (room.room === 'bedroom') roomTitle = room.department === 'modern' ? 'نوم رئيسية مودرن' : 'نوم كلاسيك';
    if (room.room === 'kids') roomTitle = 'الأطفال والشباب';
  } else {
    if (room.room === 'living') roomTitle = room.department === 'modern' ? 'Modern Living' : 'Classic Salons';
    if (room.room === 'dining') roomTitle = room.department === 'modern' ? 'Modern Dining' : 'Classic Dining';
    if (room.room === 'bedroom') roomTitle = room.department === 'modern' ? 'Modern Bedroom' : 'Classic Bedroom';
    if (room.room === 'kids') roomTitle = 'Kids & Youth';
  }

  useEffect(()=>{const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[]);
  useEffect(()=>{setViewIndex(0);setSelectedProductId(null)},[room]);
  useEffect(()=>{const handleKey=(event:KeyboardEvent)=>{if(event.key==='ArrowDown'||event.key==='PageDown'){event.preventDefault();setViewIndex(c=>Math.min(views.length-1,c+1))}if(event.key==='ArrowUp'||event.key==='PageUp'){event.preventDefault();setViewIndex(c=>Math.max(0,c-1))}if(event.key==='Escape')onClose()};window.addEventListener('keydown',handleKey);return()=>window.removeEventListener('keydown',handleKey)},[onClose,views.length]);

  const handleWheel=(event:React.WheelEvent<HTMLElement>)=>{if(Math.abs(event.deltaY)<18||selectedProductId)return;const now=performance.now();if(now-lastWheelAt.current<620)return;lastWheelAt.current=now;setViewIndex(c=>event.deltaY>0?Math.min(views.length-1,c+1):Math.max(0,c-1))};
  const selectedProduct=selectedProductId?products[selectedProductId]:null;
  const displayedPrice=useMemo(()=>{if(!selectedProduct)return'';if(!selectedProduct.priceEgp)return language==='ar'?'السعر عند الطلب':'Price on request';return new Intl.NumberFormat(language==='ar'?'ar-EG':'en-EG',{style:'currency',currency:'EGP',maximumFractionDigits:0}).format(selectedProduct.priceEgp)},[language,selectedProduct]);

  return <section className="interactive-room" aria-label={roomTitle} onWheel={handleWheel}>
    <div className="interactive-room__topbar"><button type="button" className="room-back" onClick={onClose}><span aria-hidden="true">←</span>{language==='ar'?'العودة للهول':'Back to hall'}</button><div className="room-title"><span>{language==='ar'?'قصر قبيصة الافتراضي':'Qubaisa Virtual Palace'}</span><strong>{roomTitle}</strong></div><div className="room-hint">{language==='ar'?'مرّر للمشي · اسحب للنظر حولك':'Scroll to move · drag to look'}</div></div>
    <div className="interactive-room__canvas"><Canvas shadows dpr={[1,1.5]} camera={{position:views[0].position,fov:48,near:.1,far:80}} gl={{antialias:true,powerPreference:'high-performance',toneMapping:THREE.ACESFilmicToneMapping}} onCreated={({gl})=>{gl.toneMappingExposure=.96;gl.outputColorSpace=THREE.SRGBColorSpace}}><Suspense fallback={null}><RoomCamera room={room} viewIndex={viewIndex}/><RoomScene room={room} language={language} onOpenProduct={setSelectedProductId}/></Suspense></Canvas></div>
    <nav className="room-viewpoints" aria-label={language==='ar'?'نقاط التجول داخل الغرفة':'Room viewpoints'}>{views.map((view,index)=><button type="button" key={`${room.department}-${room.room}-${index}`} className={index===viewIndex?'is-active':''} onClick={()=>setViewIndex(index)}><span>{String(index+1).padStart(2,'0')}</span>{language==='ar'?view.labelAr:view.labelEn}</button>)}</nav>
    {selectedProduct&&<aside className="room-product-sheet" aria-live="polite"><button type="button" className="product-sheet-close" onClick={()=>setSelectedProductId(null)} aria-label={language==='ar'?'إغلاق':'Close'}>×</button><span>{selectedProduct.dataStatus==='verified'?(language==='ar'?'منتج موثق':'Verified product'):(language==='ar'?'نموذج عرض استرشادي':'Display proxy')}</span><h2>{language==='ar'?selectedProduct.nameAr:selectedProduct.nameEn}</h2><strong className="product-sheet-price">{displayedPrice}</strong><p>{language==='ar'?selectedProduct.descriptionAr:selectedProduct.descriptionEn}</p><button type="button" className="product-inquiry" disabled={!selectedProduct.inquiryEnabled}>{language==='ar'?'استفسر عن القطعة':'Ask about this piece'}</button></aside>}
  </section>;
}
