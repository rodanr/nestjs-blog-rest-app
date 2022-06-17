import { IsString } from 'class-validator';

export class BaseBlogDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}
