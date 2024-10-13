import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users, NewUser, User } from './users.schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getUserById(userId: string): Promise<User> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.userId, userId));

    if (result.length === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return result[0];
  }

  async createUser(createUserDto: CreateUserDto): Promise<NewUser> {
    const existingUser = await this.getUserById(createUserDto.userId).catch(
      () => null,
    );
    if (existingUser) {
      throw new ConflictException(
        `User with ID ${createUserDto.userId} already exists`,
      );
    }

    const newUser = {
      userId: createUserDto.userId,
      username: createUserDto.username || '',
      motto: createUserDto.motto || '',
      createdAt: createUserDto.createdAt || new Date(),
    };

    const [createdUser] = await this.db
      .insert(users)
      .values(newUser)
      .returning();
    return createdUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.db
      .delete(users)
      .where(eq(users.userId, userId))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async handleClerkWebhook(webhookData: any): Promise<NewUser> {
    const userId = webhookData.data.id;
    const username = webhookData.data.username;

    return this.createUser({ userId, username });
  }
}
