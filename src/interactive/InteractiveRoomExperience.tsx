import { lazy, Suspense } from 'react';

export type InteractiveRoom = {
  department: 'modern' | 'classic';
  room: 'living' | 'dining' | 'bedroom' | 'kids';
};

interface Props {
  room: InteractiveRoom;
  language: 'ar' | 'en';
  onClose: () => void;
}

const InteractiveRoomExperienceImpl = lazy(() => import('./InteractiveRoomExperienceImpl'));

function RoomChunkFallback({ room, language }: Pick<Props, 'room' | 'language'>) {
  const roomTitle = language === 'ar'
    ? room.department === 'modern' ? 'المعيشة المودرن' : 'الصالونات والنيو كلاسيك'
    : room.department === 'modern' ? 'Modern Living' : 'Neo-Classical Salon';

  return (
    <section className="interactive-room" aria-busy="true" aria-label={roomTitle}>
      <div className="room-entry-veil" style={{ animation: 'none' }}>
        <span>QUBAISA FURNITURE</span>
        <strong>{roomTitle}</strong>
        <i />
      </div>
    </section>
  );
}

/**
 * Keep the heavy room runtime (CameraControls, room scenes, product overlays)
 * out of the initial application chunk. It is requested only when a visitor
 * actually enters a production-ready room.
 */
export function InteractiveRoomExperience(props: Props) {
  return (
    <Suspense fallback={<RoomChunkFallback room={props.room} language={props.language} />}>
      <InteractiveRoomExperienceImpl {...props} />
    </Suspense>
  );
}
