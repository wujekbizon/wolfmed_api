import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsDate,
  IsOptional,
} from 'class-validator';

class StepDto {
  @IsString()
  @IsNotEmpty()
  step: string;
}

class ProcedureDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  procedure: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  algorithm: StepDto[];
}

export class ProcedureDto {
  @ValidateNested()
  @Type(() => ProcedureDataDto)
  data: ProcedureDataDto;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}

export { ProcedureDataDto as ProcedureData, StepDto as Step };
