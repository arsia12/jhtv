import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardDTO {
    @ApiProperty()
    readonly name: string;
    
    @ApiProperty()
    readonly content: string;
    
    @ApiProperty()
    readonly movie: string;
}