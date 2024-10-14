import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { CompletedTestsService } from './completed-tests.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { CompletedTestDto } from './dto/completed-test.dto';

@Controller('completed-tests')
@UseGuards(RolesGuard)
export class CompletedTestsController {
  constructor(private readonly completedTestsService: CompletedTestsService) {}

  @Get('user/:userId')
  @Roles(Role.USER, Role.ADMIN)
  async getCompletedTestsByUser(@Param('userId') userId: string) {
    return this.completedTestsService.getCompletedTestsByUser(userId);
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  async getCompletedTest(@Param('id') id: string) {
    return this.completedTestsService.getCompletedTest(id);
  }

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  async createCompletedTest(@Body() completedTestDto: CompletedTestDto) {
    return this.completedTestsService.createCompletedTest(completedTestDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.USER, Role.ADMIN)
  async deleteCompletedTest(@Param('id') id: string) {
    await this.completedTestsService.deleteCompletedTest(id);
  }
}
