import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto, TypeDto } from './dto';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { JwtRefreshGuard } from './guard/jwt.refresh.guard';
import { Tokens } from './types';
import { User } from './user/user.decorators';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() signInDto: SignInDto): Promise<Tokens> {
        const {type, ...bayeursCreateInput} = signInDto
        return this.authService.signupLocal(bayeursCreateInput,type)
    }

    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signinLocal(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logoutLocal(
        @User() user : any,
        @Body() typeDto : TypeDto
    ) {
        
       return this.authService.logoutLocal(user.id, typeDto.type)
    }

    @UseGuards(JwtRefreshGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @User() user : any,
        @Body() typeDto : TypeDto
    ): Promise<Tokens>  {
        console.log(user);
        
        return this.authService.refreshTokens(user.id, user.refreshToken, typeDto.type)
    }

}
