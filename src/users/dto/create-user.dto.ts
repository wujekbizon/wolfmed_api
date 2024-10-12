import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  motto?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
