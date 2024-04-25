'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { signIn } from 'src/auth';
import { db } from 'src/database/db';
import { getUserByEmail } from 'src/database/user';
import { sendVerificationEmail } from 'src/lib/mail';
import { DEFAULT_LOGIN_REDIRECT, useEmail } from 'src/config';
import { generateVerificationToken } from 'src/service/token';
import { registerValidate } from 'src/shared/validate/user-validate';
import { MESSAGE } from 'src/shared/constain/message';

export const register = async (values: z.infer<typeof registerValidate>) => {
  const validatedFields = registerValidate.safeParse(values);

  if (!validatedFields.success) return { error: MESSAGE.ERROR.INVALID_FIELDS };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: MESSAGE.ERROR.EMAIL.EXIST };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  if (useEmail) return { success: MESSAGE.SUCCESS.EMAIL.CONFIRM };

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
          return { error: MESSAGE.ERROR.INVALID_FIELDS };
        default:
          return { error: MESSAGE.ERROR.WRONG };
      }
    }
    throw error;
  }
};
