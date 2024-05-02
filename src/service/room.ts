'use server';

import { db } from 'src/database/db';
import * as dbRoom from 'src/database/room/room';
import { RoomCreate } from 'src/shared/types/room';
import { DatabaseOptionDefault } from 'src/shared/types/database-type';
import { MESSAGE } from 'src/shared/constain/message';
import { useTransition } from 'react';

export const create = async (room: RoomCreate) => {
  let roomDetail = await db.rooms.create({ data: room });
  return { success: MESSAGE.SUCCESS.ROOM.CREATE, id: roomDetail.id };
};

export const getRooms = async (authId?: string, op?: DatabaseOptionDefault) => {
  if (!authId) return await dbRoom.getRooms(op || {});
  return await dbRoom.getRoomUser(authId, op || {});
};
