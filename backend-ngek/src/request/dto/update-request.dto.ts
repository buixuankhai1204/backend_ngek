import { CreateRequestDto } from './create-request.dto.js';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
