import { ApiProperty } from "@nestjs/swagger";

export class CreateChannelDTO {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly content: string;
}