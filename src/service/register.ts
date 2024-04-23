'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from 'src/database/db';
import { getUserByEmail } from 'src/database/user';
import { sendVerificationEmail } from 'src/lib/mail';
import { generateVerificationToken } from 'src/lib/token';
import { registerValidate } from 'src/shared/validate/user-validate';

export const register = async (values: z.infer<typeof registerValidate>) => {
  const validatedFields = registerValidate.safeParse(values);

  if (!validatedFields.success) return { error: 'messages_app.errors.invalid_fields' };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'messages_app.errors.exist_email' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'messages_app.errors.authconfirm_mail_send' };
};
