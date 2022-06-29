import { Module } from '@nestjs/common';
import { ProprieteService } from './propriete.service';
import { ProprieteController } from './propriete.controller';
import { UploadController } from './upload.controller';

@Module({
  controllers: [ProprieteController,UploadController],
  providers: [ProprieteService]
})
export class ProprieteModule {}
