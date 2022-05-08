import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BayeursModule } from './bayeurs/bayeurs.module';
import { GetAwayeModule } from './get-awaye/get-awaye.module';
import { ProprieteModule } from './propriete/propriete.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), BayeursModule, GetAwayeModule, ProprieteModule],
})
export class AppModule {}
