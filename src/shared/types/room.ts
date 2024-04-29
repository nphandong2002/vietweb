import { Rooms } from '@prisma/client';
import { db } from 'src/database/db';
import { getRooms } from 'src/service/room';

export type RoomInfoList = Awaited<ReturnType<typeof getRooms>>;
export type RoomCreate = Omit<Rooms, 'id' | 'createdAt' | 'updatedAt'>;
export type RoomInfo = Awaited<ReturnType<typeof db.rooms.findFirst>>;
