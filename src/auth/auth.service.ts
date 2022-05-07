import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SignInDto } from './dto';
import * as bcrypt from "bcrypt"
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv'
import { bayeurs, Prisma } from '@prisma/client';

dotenv.config()

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}
    
    async hashData(data: string){
        return bcrypt.hash(data, 10)
    }

    async getTokens(payload : Prisma.bayeursCreateInput) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                payload,
                {
                    secret: process.env.SECRET_KEY_AT,
                    expiresIn: 60

                }
            ),
            this.jwtService.signAsync(
                payload,
                {
                    secret: process.env.SECRET_KEY_RT,
                    expiresIn: 60 * 60 * 24 * 7

                }
            )
        ])
        return {
            access_token: at,
            refresh_token: rt
        };
    }

    async signupLocal(dto: Prisma.bayeursCreateInput | any ,type: string): Promise<Tokens> {
        
        try {
            dto.password = await this.hashData(dto.password)
            let data = dto
            const newUser = (type === "bayeur") ? 
            await this.prisma.bayeurs.create({ data }) : null
            const tokens = await this.getTokens(newUser)
            
            await this.updateRtHash({ id: newUser.id, rt: tokens.refresh_token, type })
            console.log(tokens);
            
            return tokens 
        } catch (error) {
            console.log(error);
            
            if (error.meta.target !== undefined) {
                if (error.meta.target[0] === 'email' ) {
                    throw new ConflictException("l'email existe déjà!");
                }
            }
          
          throw new NotFoundException(error)
        }
       
    }

    async updateRtHash({ id, rt, type }: { id: number; rt: string; type: string; }): Promise<bayeurs | any> {
        const hash = await this.hashData(rt);
        try {
            const req = (type === "bayeur") ? this.prisma.bayeurs : null
          return await req.update({
            where: {id},
            data: {
              hashedRt: hash
            }
          })
        } catch (error) {
          throw new NotFoundException(error)
        }
    }

    async signinLocal(dto: AuthDto): Promise<Tokens> {
        const where = {email: dto.email}
        const req = (dto.type === "bayeur") ? this.prisma.bayeurs : null
        const user = await req.findUnique({ where })
        if(!user) throw new ForbiddenException()
        const passwordCompare = await bcrypt.compare(dto.password, user.password)
        if(!passwordCompare) throw new ForbiddenException()

        const tokens = await this.getTokens(user)
        await this.updateRtHash({ id: user.id, rt: tokens.refresh_token , type : dto.type })
        return tokens
    }

    async logoutLocal(userId: number, type: string) {
        const req = (type === "bayeur") ? this.prisma.bayeurs : null
        return await req.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })
    }

    async refreshTokens(userId: number, rt: string, type: string): Promise<Tokens> {
        const user = await this.prisma.bayeurs.findUnique({
            where: {
                id: userId,
            }
        })
        if(!user || user.hashedRt === null ) throw new ForbiddenException()
        const rtMatches = await bcrypt.compare(rt, user.hashedRt)
    
        if(!rtMatches) throw new ForbiddenException()
        const tokens = await this.getTokens(user)
        
        await this.updateRtHash({ id: user.id, rt: tokens.refresh_token , type })
        return tokens
    }

}
