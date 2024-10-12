import { Module } from '@nestjs/common';
import { CustomersMessagesController } from './customers-messages.controller';
import { CustomersMessagesService } from './customers-messages.service';

@Module({
  controllers: [CustomersMessagesController],
  providers: [CustomersMessagesService],
})
export class CustomersMessagesModule {}
