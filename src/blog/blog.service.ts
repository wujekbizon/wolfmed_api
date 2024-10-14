import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { blogPosts } from './blog.schema';
import { eq } from 'drizzle-orm';
import type { Post } from 'src/schema';
import { PostDto } from './dto/post.dto';

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

  async createPost(createPostDto: PostDto): Promise<Post> {
    const [post] = await this.db
      .insert(blogPosts)
      .values(createPostDto)
      .returning();

    return post;
  }

  async updatePostById(id: string, updatePostDto: PostDto): Promise<Post> {
    const [post] = await this.db
      .update(blogPosts)
      .set(updatePostDto)
      .where(eq(blogPosts.id, id))
      .returning();

    return post;
  }

  async deletePostById(id: string): Promise<void> {
    await this.db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
}
