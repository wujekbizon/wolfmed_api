import { Module } from '@nestjs/common';
import { CustomersMessagesController } from './customers-messages.controller';
import { CustomersMessagesService } from './customers-messages.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [CustomersMessagesController],
  providers: [CustomersMessagesService],
})
export class CustomersMessagesModule {}
