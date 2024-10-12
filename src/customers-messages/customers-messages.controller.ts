import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CustomersMessagesService } from './customers-messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('customers-messages')
export class CustomersMessagesController {
  constructor(
    private readonly customersMessagesService: CustomersMessagesService,
  ) {}

  @Get()
  async getAllMessages() {
    return this.customersMessagesService.getAllMessages();
  }

  @Get(':email')
  async getMessagesByUser(@Param('email') email: string) {
    return this.customersMessagesService.getMessagesByUser(email);
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.customersMessagesService.createMessage(createMessageDto);
  }

  @Delete(':email/:id')
  @HttpCode(204)
  async deleteMessageByUser(
    @Param('email') email: string,
    @Param('id') id: string,
  ) {
    await this.customersMessagesService.deleteMessageByUser(
      email,
      parseInt(id, 10),
    );
  }
}
