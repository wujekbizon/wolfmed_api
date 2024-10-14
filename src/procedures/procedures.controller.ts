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
import { ProceduresService } from './procedures.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProcedureDto } from './dto/procedure.dto';

@Controller('procedures')
@UseGuards(RolesGuard)
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async getAllProcedures() {
    return this.proceduresService.getAllProcedures();
  }

  @Post()
  @Roles(Role.ADMIN)
  async createProcedure(@Body() createProcedureDto: ProcedureDto) {
    return this.proceduresService.createProcedure(createProcedureDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateProcedure(
    @Param('id') id: string,
    @Body() updateProcedureDto: ProcedureDto,
  ) {
    return this.proceduresService.updateProcedure(id, updateProcedureDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteProcedure(@Param('id') id: string) {
    return this.proceduresService.deleteProcedure(id);
  }
}
