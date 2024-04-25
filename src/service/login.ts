'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { db } from 'src/database/db';
import { MESSAGE } from 'src/shared/constain/message';
import { getUserByEmailorPhone } from 'src/database/user';
import { DEFAULT_LOGIN_REDIRECT, useEmail } from 'src/config';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from 'src/lib/mail';
import { loginValidate as LoginSchema } from 'src/shared/validate/user-validate';
import { generateTwoFactorToken, generateVerificationToken } from 'src/service/token';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from 'src/database/auth';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGE.ERROR.INVALID_FIELDS };

  const { username, password, code } = validatedFields.data;

  const existingUser = await getUserByEmailorPhone(username);
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: MESSAGE.ERROR.USER.NOT };

  if (useEmail && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    const { data, error } = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    if (error) return { error: MESSAGE.ERROR.EMAIL.SEND };
    return { success: MESSAGE.SUCCESS.EMAIL.CONFIRM };
  }

  if (useEmail && existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

    if (!twoFactorToken) return { error: MESSAGE.ERROR.CODE.INVALID };
    if (twoFactorToken.token !== code) return { error: MESSAGE.ERROR.CODE.INVALID };

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) return { error: MESSAGE.ERROR.CODE.EXPIRED };

    await db.twoFactorToken.delete({
      where: { id: twoFactorToken.id },
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

    if (existingConfirmation) {
      await db.twoFactorConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    }

    await db.twoFactorConfirmation.create({
      data: {
        userId: existingUser.id,
      },
    });
  }

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: MESSAGE.ERROR.INVALID_FIELDS };
        default:
          return { error: MESSAGE.ERROR.WRONG };
      }
    }
    throw error;
  }
};
