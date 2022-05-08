import { Module } from '@nestjs/common';
import { ProprieteService } from './propriete.service';
import { ProprieteController } from './propriete.controller';

@Module({
  controllers: [ProprieteController],
  providers: [ProprieteService]
})
export class ProprieteModule {}
