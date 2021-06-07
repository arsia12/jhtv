import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentlDTO {
    @ApiProperty()
    readonly content: string;
}