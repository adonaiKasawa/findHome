import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsCreditCard, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { isNumberObject } from "util/types";

export class AuthDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;
}

export class SignInDto {

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    id : number
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nom : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    prenom : string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    tel : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adresse    : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password   : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    creditCard : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type : string    

    // @ApiProperty()
    // @IsOptional()
    // propriete : ProprieteDto
}

export class TypeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string
}