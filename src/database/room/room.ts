import { RoomCreate } from 'src/shared/types/room';
import { checkOption } from 'src/shared/utils/database-utils';
import { DatabaseOptionDefault } from 'src/shared/types/database-type';

import { db } from '../db';

export const getRooms = async ({ page = 0, perpage = 10 }: DatabaseOptionDefault) => {
  try {
    const rooms = await db.rooms.findMany({
      include: {
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
          },
        },
      },
      ...checkOption({ page, perpage }),
    });
    return rooms;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getRoomUserFavorites = async (userId: string, option?: DatabaseOptionDefault) => {
  try {
    const userLikes = await db.roomUserFavorites.findMany({
      where: {
        userId: userId,
      },
      ...checkOption(option),
    });
    return userLikes;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getRoomUser = async (
  userid: string | null,
  { page = 0, perpage = 10 }: DatabaseOptionDefault
) => {
  try {
    const roomFavorites = userid ? await getRoomUserFavorites(userid) : [];
    const rooms = await db.rooms.findMany({
      include: {
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
          },
        },
      },
      ...(roomFavorites.length && {
        where: {
          NOT: {
            id: {
              in: roomFavorites.map((room) => room.roomId),
            },
          },
        },
      }),
      skip: page * perpage,
      take: perpage,
    });
    return rooms;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getInfo = async (roomId: string) => {
  try {
    let info = await db.rooms.findFirst({
      where: {
        id: roomId,
      },
    });
    return info;
  } catch (error) {
    console.error(error);
    return {};
  }
};
