import { eq } from 'drizzle-orm';
import { db } from '../db';
import { InsertUser, SelectPost, SelectUser, posts, users } from '../db/schema';

export async function insertUser(data: InsertUser): Promise<SelectUser[]> {
  return await db.insert(users).values(data).returning();
}

export async function getUserWithPosts(
  id: SelectUser['id']
): Promise<Array<{ users: SelectUser; posts: SelectPost | null }>> {
  return await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(posts, eq(posts.userId, users.id));
}

export async function deleteUser(id: SelectUser['id']): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}
