import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { customersMessages } from './customers-messages.schema';
import { eq, and } from 'drizzle-orm';
import { CreateMessageDto } from './dto/create-message.dto';
import { CustomerMessage, NewCustomerMessage } from 'src/schema';

@Injectable()
export class CustomersMessagesService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllMessages(): Promise<CustomerMessage[]> {
    return this.db.select().from(customersMessages);
  }

  async getMessagesById(id: string): Promise<CustomerMessage[]> {
    return this.db
      .select()
      .from(customersMessages)
      .where(eq(customersMessages.id, parseInt(id)));
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

  async deleteMessageById(id: number): Promise<void> {
    const result = await this.db
      .delete(customersMessages)
      .where(eq(customersMessages.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
