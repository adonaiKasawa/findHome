import { PartialType } from '@nestjs/mapped-types';
import { CreateGetAwayeDto } from './create-get-awaye.dto';

export class UpdateGetAwayeDto extends PartialType(CreateGetAwayeDto) {
  id: number;
}
