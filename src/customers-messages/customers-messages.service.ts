import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
  customersMessages,
  CustomerMessage,
  NewCustomerMessage,
} from './customers-messages.schema';
import { eq, and } from 'drizzle-orm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class CustomersMessagesService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllMessages(): Promise<CustomerMessage[]> {
    return this.db.select().from(customersMessages);
  }

  async getMessagesByUser(email: string): Promise<CustomerMessage[]> {
    return this.db
      .select()
      .from(customersMessages)
      .where(eq(customersMessages.email, email));
  }

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<NewCustomerMessage> {
    const [createdMessage] = await this.db
      .insert(customersMessages)
      .values(createMessageDto)
      .returning();
    return createdMessage;
  }

  async deleteMessageByUser(email: string, id: number): Promise<void> {
    const result = await this.db
      .delete(customersMessages)
      .where(
        and(eq(customersMessages.email, email), eq(customersMessages.id, id)),
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(
        `Message with ID ${id} not found for user ${email}`,
      );
    }
  }
}
