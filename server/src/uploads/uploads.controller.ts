import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { memoryStorage } from 'multer';
import { Express, Response } from 'express';
import { ImageSource } from '@imgly/background-removal-node';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('preprocess')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(), // 使用内存存储
    }),
  )
  async preprocessImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new Error('File is not provided');
    }
    const filePath: ImageSource = await this.uploadsService.saveFile(file);
    const processedBuffer = await this.uploadsService.removeBackground(
      filePath,
      // Add other required arguments here
    );
    res.setHeader('Content-Type', 'image/png');
    res.send(processedBuffer);
  }
}
