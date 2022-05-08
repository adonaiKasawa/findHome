import { PartialType } from '@nestjs/swagger';
import { CreateProprieteDto } from './create-propriete.dto';

export class UpdateProprieteDto extends PartialType(CreateProprieteDto) {}
