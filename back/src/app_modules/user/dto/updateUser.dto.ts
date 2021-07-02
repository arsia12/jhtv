import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly password : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly phone : string;

    @IsEmail()
    @IsOptional()
    @ApiProperty()
    readonly email : string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    readonly nickname : string;
}