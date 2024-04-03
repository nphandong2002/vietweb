import { createKysely } from '@vercel/postgres-kysely';
import { AccountTable, UserTable } from './schema/user-schema';

export interface Database {
  users: UserTable;
  account: AccountTable;
}

export const db = createKysely<Database>();
export { sql } from 'kysely';
