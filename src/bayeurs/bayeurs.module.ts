import { Module } from '@nestjs/common';
import { BayeursService } from './bayeurs.service';
import { BayeursController } from './bayeurs.controller';

@Module({
  controllers: [BayeursController],
  providers: [BayeursService]
})
export class BayeursModule {}
