import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { diskStorage } from "multer";
import { randomUUID } from 'crypto';
import Path = require('path');
import { FileInterceptor} from '@nestjs/platform-express';
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
const storage = {
    storage : diskStorage({
        destination: 'src/uploads/files',
        filename: (req, file, cb) =>{
            const filename: string = 'myfile-' + randomUUID();
            const extension: string = Path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`)
        }
    })
}

@Controller('upload')
export class UploadController {

    // @UseGuards(JwtAuthGuard) your methode of guard
    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    uploaiFile(
        @UploadedFile() file:any
    ){
        console.log(file)
        return file
    }
}