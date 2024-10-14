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

  @Get(':id')
  async getMessagesById(@Param('id') id: string) {
    return this.customersMessagesService.getMessagesById(id);
  }

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.customersMessagesService.createMessage(createMessageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMessageById(@Param('id') id: string) {
    await this.customersMessagesService.deleteMessageById(parseInt(id, 10));
  }
}
