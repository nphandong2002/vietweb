import { getVerificationTokenByToken } from 'src/database/auth';
import { db } from 'src/database/db';
import { getUserByEmail } from 'src/database/user';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: 'not_token' };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: 'expired_token' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: 'not_email' };

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

  return { success: 'email_verified' };
};
