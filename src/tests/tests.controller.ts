import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { TestDto } from './dto/test.dto';

@Controller('tests')
@UseGuards(RolesGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async getAllTests() {
    return this.testsService.getAllTests();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  async getTestById(@Param('id') id: string) {
    return this.testsService.getTestById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  async createTest(@Body() testDto: TestDto) {
    return this.testsService.createTest(testDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateTest(@Param('id') id: string, @Body() testDto: TestDto) {
    return this.testsService.updateTest(id, testDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteTest(@Param('id') id: string) {
    return this.testsService.deleteTest(id);
  }
}
