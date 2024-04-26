import { RoomIdPageProps } from 'src/shared/types/layout';
import { SplashScreen } from 'src/sections/component/loading';
import RoomDetailPage from 'src/sections/pages/room/room-detail';
import { Room } from 'src/shared/context/liveblocks/room-provider';

function RoomDetailRoot({ params }: RoomIdPageProps) {
  return (
    <Room roomId={params.roomId} fallback={<SplashScreen />}>
      <RoomDetailPage roomId={params.roomId}></RoomDetailPage>
    </Room>
  );
}

export default RoomDetailRoot;
