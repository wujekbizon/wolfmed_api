import { Controller, Get } from '@nestjs/common';
import { ProceduresService } from './procedures.service';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Get()
  async getAllProcedures() {
    return this.proceduresService.getAllProcedures();
  }
}
