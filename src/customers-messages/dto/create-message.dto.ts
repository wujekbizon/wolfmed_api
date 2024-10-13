import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
