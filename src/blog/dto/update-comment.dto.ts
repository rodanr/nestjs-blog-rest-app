import { PartialType } from '@nestjs/mapped-types';
import { BaseCommentDto } from './base-comment.dto';

export class UpdateCommentDto extends PartialType(BaseCommentDto) {}
