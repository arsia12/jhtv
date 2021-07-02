import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class updatePasswordDto  {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly id : number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password : string;
}