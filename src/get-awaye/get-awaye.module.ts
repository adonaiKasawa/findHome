import { Module } from '@nestjs/common';
import { GetAwayeService } from './get-awaye.service';
import { GetAwayeGateway } from './get-awaye.gateway';

@Module({
  providers: [GetAwayeGateway, GetAwayeService]
})
export class GetAwayeModule {}
