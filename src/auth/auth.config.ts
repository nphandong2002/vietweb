import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUserByEmailorPhone } from 'src/database/user';
import { loginValidate } from 'src/shared/validate/user-validate';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginValidate.safeParse(credentials);
        if (validatedFields.success) {
          const { username, password } = validatedFields.data;
          const user = await getUserByEmailorPhone(username);
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
