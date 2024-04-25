import { Rooms } from '@prisma/client';
import { getRooms } from 'src/service/room';

export type RoomInfo = Awaited<ReturnType<typeof getRooms>>;
export type RoomCreate = Omit<Rooms, 'id' | 'createdAt' | 'updatedAt'>;
