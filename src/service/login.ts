'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { db } from 'src/database/db';
import { DEFAULT_LOGIN_REDIRECT } from 'src/config';
import { getUserByEmailorPhone } from 'src/database/user';
import { generateTwoFactorToken, generateVerificationToken } from 'src/lib/token';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from 'src/lib/mail';
import { loginValidate as LoginSchema } from 'src/shared/validate/user-validate';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from 'src/database/auth';

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'messages_app.errors.invalid_fields' };

  const { username, password, code } = validatedFields.data;

  const existingUser = await getUserByEmailorPhone(username, password);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: 'messages_app.auth.not_user' };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'messages_app.auth.confirm_mail_send' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
    const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

    if (!twoFactorToken) return { error: 'messages_app.errors.invalid_code' };
    if (twoFactorToken.token !== code) return { error: 'messages_app.errors.invalid_code' };

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) return { error: 'messages_app.errors.expired_code' };

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
          return { error: 'messages_app.errors.invalid_fields' };
        default:
          return { error: 'messages_app.errors.wrong' };
      }
    }
    throw error;
  }
};
