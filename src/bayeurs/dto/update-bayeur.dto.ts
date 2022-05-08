import { PartialType } from '@nestjs/swagger';
import { CreateBayeurDto } from './create-bayeur.dto';

export class UpdateBayeurDto extends PartialType(CreateBayeurDto) {}
