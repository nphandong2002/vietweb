import { db } from './db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByEmailorPhone = async (username: string) => {
  try {
    const user = await db.user.findMany({
      where: {
        OR: [{ phone: username }, { email: username }],
      },
    });

    return user[0];
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
