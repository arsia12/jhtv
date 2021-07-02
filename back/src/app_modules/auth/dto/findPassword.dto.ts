import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class FindPasswordDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly username : string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone : string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email : string;
}