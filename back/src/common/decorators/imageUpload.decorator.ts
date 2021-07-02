import { UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFilter, uploadPath } from "src/utils/file_upload";
import { diskStorage } from 'multer';

export function imageUpload(image_file: string) {
    UseInterceptors(
        FileInterceptor(image_file, {
            storage: diskStorage({
                destination: uploadPath,
                filename: editFileName,
            }),
            fileFilter: imageFilter,
        }),
    )
}