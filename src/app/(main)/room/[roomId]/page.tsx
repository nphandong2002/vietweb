import { SplashScreen } from 'src/sections/component/loading';
import { Room } from 'src/shared/context/liveblocks/room-provider';
import { RoomIdPageProps } from 'src/shared/types/layout';

function RoomDetailRoot({ params }: RoomIdPageProps) {
  return (
    <Room roomId={params.roomId} fallback={<SplashScreen />}>
      <div></div>
    </Room>
  );
}

export default RoomDetailRoot;
