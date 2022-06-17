import { PartialType } from '@nestjs/mapped-types';
import { BaseBlogDto } from './base-blog.dto';
export class UpdateBlogDto extends PartialType(BaseBlogDto) {}
