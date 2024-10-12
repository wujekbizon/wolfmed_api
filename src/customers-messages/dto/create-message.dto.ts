import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
