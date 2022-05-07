import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(
        private configService: ConfigService
    ) {
        super({
            datasources : {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        })
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    async onModuleInit() {
        await this.$connect();
    }

    
}
