import { eq } from 'drizzle-orm';

import { db } from '../db';
import { InsertPost, SelectPost, posts } from '../db/schema';

export async function insertPost(data: InsertPost): Promise<SelectPost[]> {
  return await db.insert(posts).values(data).returning();
}

export async function updatePost(
  id: SelectPost['id'],
  data: Partial<Omit<SelectPost, 'id'>>
): Promise<SelectPost[]> {
  return await db.update(posts).set(data).where(eq(posts.id, id)).returning();
}
