import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
  IsOptional,
} from 'class-validator';

class AnswerDto {
  @IsString()
  option: string;

  @IsBoolean()
  isCorrect: boolean;
}

class TestDataDto {
  @IsString()
  question: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

export class TestDto {
  @ValidateNested()
  @Type(() => TestDataDto)
  data: TestDataDto;

  @IsString()
  category: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
