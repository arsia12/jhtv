import { Controller } from '@nestjs/common';
import { imageUpload } from 'src/common/decorators/imageUpload.decorator';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor (
        private readonly imageService : ImageService,
    ){}
    
    @imageUpload('image_file')
    async imageUpload () {

    }
}
