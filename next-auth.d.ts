import NextAuth, { type DefaultSession } from 'next-auth';
import { UserRole } from 'src/shared/constain/user';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
