'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { db } from 'src/database/db';
import { getUserByEmailorPhone } from 'src/database/user';
import { DEFAULT_LOGIN_REDIRECT, useEmail } from 'src/config';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from 'src/lib/mail';
import { loginValidate as LoginSchema } from 'src/shared/validate/user-validate';
import { generateTwoFactorToken, generateVerificationToken } from 'src/lib/token';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from 'src/database/auth';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'invalid_fields' };

  const { username, password, code } = validatedFields.data;

  const existingUser = await getUserByEmailorPhone(username);
  if (!existingUser || !existingUser.email || !existingUser.password) return { error: 'not_user' };

  if (useEmail && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    const { data, error } = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    if (error) return { error: 'mail_send_fail' };
    return { success: 'confirm_mail_send' };
  }

  if (useEmail && existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

    if (!twoFactorToken) return { error: 'invalid_code' };
    if (twoFactorToken.token !== code) return { error: 'invalid_code' };

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) return { error: 'expired_code' };

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
          return { error: 'invalid_fields' };
        default:
          return { error: 'wrong' };
      }
    }
    throw error;
  }
};
