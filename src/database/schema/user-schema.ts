import { Generated, ColumnType, Updateable, Selectable, Insertable } from 'kysely';
import { UserRole } from 'src/shared/constain/user';

export interface UserTable {
  user_id: Generated<number>;
  gender: 'male' | 'female' | 'other';
  birthday: Date;
  avatar: string;
  preview: string;
  nick_name: string | null;
  full_name: string;
  gmail: string;
  phone: number;
  folder: string;
  role: UserRole;
  created_at: Date;
  update_at: ColumnType<Date, string | undefined, never>;
}
export interface AccountTable {
  account_id: Generated<number>;
  user_id: number;
  user_name: string;
  password: string;
}
export type User = Selectable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
export type NewUser = Insertable<UserTable>;
