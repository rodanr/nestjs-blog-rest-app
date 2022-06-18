import { IsEmail, IsString } from 'class-validator';
export class BaseUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly secondName: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  // removed readonly to include hash here
  password: string;
}
