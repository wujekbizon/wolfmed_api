import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { blogPosts, Post } from './blog.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class BlogService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllPosts(): Promise<Post[]> {
    return this.db.select().from(blogPosts);
  }

  async getPostById(id: string): Promise<Post> {
    const result = await this.db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id));

    if (result.length === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    return result[0];
  }
}
