import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { procedures } from './procedures.schema';
import { ExtendedProcedure } from 'src/schema';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { eq } from 'drizzle-orm';
import { ProcedureDto } from './dto/procedure.dto';

@Injectable()
export class ProceduresService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllProcedures(): Promise<ExtendedProcedure[]> {
    return this.db.select().from(procedures);
  }

  async createProcedure(
    procedure: CreateProcedureDto,
  ): Promise<ExtendedProcedure> {
    const [createdProcedure] = await this.db
      .insert(procedures)
      .values(procedure)
      .returning();

    return createdProcedure;
  }

  async updateProcedure(
    id: string,
    procedure: ProcedureDto,
  ): Promise<ExtendedProcedure> {
    const [updatedProcedure] = await this.db
      .update(procedures)
      .set(procedure)
      .where(eq(procedures.id, id))
      .returning();

    return updatedProcedure;
  }

  async deleteProcedure(id: string): Promise<void> {
    await this.db.delete(procedures).where(eq(procedures.id, id));
  }
}
