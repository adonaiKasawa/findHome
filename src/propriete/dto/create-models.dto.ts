import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModelsDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    numero : string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    nom : string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    nombrePiece : number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    prix : number

    @ApiProperty()
    @IsNotEmpty() 
    @IsString()
    periodPayement : string

    @ApiProperty()
    @IsOptional()
    @IsString()
    video : string

    @ApiProperty()
    @IsOptional()
    @IsString()
    photo: string

    // @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    proprieteId : number
}

export class CreatePieceDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type : string

    @ApiProperty()
    @IsOptional()
    @IsString()
    photo : string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description : string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    modelsId : number
}