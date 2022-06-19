import { IsInt, IsString } from 'class-validator';
import { BaseCommentDto } from './base-comment.dto';

export class CreateCommentDto extends BaseCommentDto {
  // @IsString()
  // readonly userName: string;
  // @IsInt()
  // readonly userId: number;
}
