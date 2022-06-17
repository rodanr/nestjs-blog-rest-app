import { IsInt, IsString } from 'class-validator';
import { BaseBlogDto } from './base-blog.dto';

export class CreateBlogDto extends BaseBlogDto {
  @IsInt()
  readonly userId: number;
  @IsString()
  readonly author: string;
}
