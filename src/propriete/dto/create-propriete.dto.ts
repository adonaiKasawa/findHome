import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateProprieteDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nom : string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type : string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adresse : string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    video : string
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    photo : string

}
