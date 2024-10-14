import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';

class FormattedAnswerDto {
  @IsString()
  questionId: string;

  @IsBoolean()
  answer: boolean;
}

export class CompletedTestDto {
  @IsString()
  userId: string;

  @IsNumber()
  score: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormattedAnswerDto)
  testResult: FormattedAnswerDto[];

  @IsOptional()
  @IsDate()
  completedAt?: Date;
}
