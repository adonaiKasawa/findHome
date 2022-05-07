import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ingoreExpiration: false,
            secretOrKey: configService.get("SECRET_KEY_RT"),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
       const refreshToken = req.get("authorization").replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        };

    }
}
