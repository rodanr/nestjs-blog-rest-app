import { IsString } from 'class-validator';

export class BaseCommentDto {
  @IsString()
  readonly comment: string;
}
