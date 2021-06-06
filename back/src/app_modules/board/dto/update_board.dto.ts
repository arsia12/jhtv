import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDTO } from './create_board.dto';

export class UpdateBoardDTO extends PartialType(CreateBoardDTO) {}