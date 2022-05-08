import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private  prisma: PrismaService,
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingoreExpiration: false,
            secretOrKey: configService.get("SECRET_KEY_AT"),
        });
    }

    async validate(payload: any) {
        // console.log(payload);
        
        const user = await this.prisma.bayeurs.findUnique({
            where:{
                email : payload.email
            }
        })
        if (user) {
            const {password, hashedRt, ...result } = user
            return result
        } else {
            throw new UnauthorizedException()
        }
    }
}