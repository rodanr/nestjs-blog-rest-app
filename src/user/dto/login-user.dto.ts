import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly userName: string;
  @IsString()
  readonly password: string;
}
