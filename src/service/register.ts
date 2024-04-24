'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from 'src/database/db';
import { getUserByEmail } from 'src/database/user';
import { sendVerificationEmail } from 'src/lib/mail';
import { generateVerificationToken } from 'src/lib/token';
import { registerValidate } from 'src/shared/validate/user-validate';
import { DEFAULT_LOGIN_REDIRECT, useEmail } from 'src/config';
import { signIn } from 'src/auth';
import { AuthError } from 'next-auth';

export const register = async (values: z.infer<typeof registerValidate>) => {
  const validatedFields = registerValidate.safeParse(values);

  if (!validatedFields.success) return { error: 'invalid_fields' };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'exist_email' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  if (useEmail) return { success: 'confirm_mail_send' };

  try {
    await signIn('credentials', {
      username: email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
