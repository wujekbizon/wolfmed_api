import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @Roles(Role.USER, Role.ADMIN)
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  // TODO: Add a method to get all users
  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':userId')
  @Roles(Role.USER, Role.ADMIN)
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string) {
    await this.usersService.deleteUser(userId);
  }

  // New endpoint for Clerk webhook
  @Post('webhook')
  @Roles(Role.USER, Role.ADMIN)
  async handleClerkWebhook(@Body() webhookData: any) {
    // Process the webhook data and create/update user accordingly
    return this.usersService.handleClerkWebhook(webhookData);
  }
}
