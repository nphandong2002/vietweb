import { getVerificationTokenByToken } from 'src/database/auth';
import { db } from 'src/database/db';
import { getUserByEmail } from 'src/database/user';
import { MESSAGE } from 'src/shared/constain/message';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: MESSAGE.ERROR.TOKEN.NOT };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: MESSAGE.ERROR.TOKEN.EXPIRED };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: MESSAGE.ERROR.EMAIL.NOT };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: MESSAGE.SUCCESS.EMAIL.VERIDIED };
};
