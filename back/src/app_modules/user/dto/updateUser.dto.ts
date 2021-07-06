import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./createUser.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {

}