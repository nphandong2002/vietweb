import { db } from '../db';
import { NewUser, User, UserUpdate } from '../schema/user-schema';

export async function getUserById(id: number) {
  return await db.selectFrom('users').where('user_id', '=', id).selectAll().executeTakeFirst();
}

export async function findPeople(criteria: Partial<User>) {
  let query = db.selectFrom('users');

  if (criteria.user_id) query = query.where('user_id', '=', criteria.user_id); // Kysely is immutable, you must re-assign!

  if (criteria.full_name) query = query.where('full_name', '=', criteria.full_name);

  if (criteria.gender) query = query.where('gender', '=', criteria.gender);

  if (criteria.created_at) query = query.where('created_at', '=', criteria.created_at);

  return await query.selectAll().execute();
}

export async function updateUser(id: number, updateWith: UserUpdate) {
  await db.updateTable('users').set(updateWith).where('user_id', '=', id).execute();
}

export async function createUser(user: NewUser) {
  return await db.insertInto('users').values(user).returningAll().executeTakeFirstOrThrow();
}

export async function deleteUser(id: number) {
  return await db.deleteFrom('users').where('user_id', '=', id).returningAll().executeTakeFirst();
}
