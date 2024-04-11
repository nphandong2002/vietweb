import { Metadata } from 'next';
import RoomPage from 'src/sections/pages/room';

export const metadata: Metadata = {
  title: 'Phòng',
};

function RoomPageRoot() {
  return <RoomPage />;
}

export default RoomPageRoot;
