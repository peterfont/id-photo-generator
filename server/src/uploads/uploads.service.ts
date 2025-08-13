import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { removeBackground, ImageSource } from '@imgly/background-removal-node';

@Injectable()
export class UploadsService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const uploadPath = join(__dirname, '..', 'uploads', file.originalname);
    if (!file.buffer) {
      throw new Error('File buffer is undefined');
    }
    await fs.writeFile(uploadPath, file.buffer);
    return uploadPath;
  }

  async removeBackground(filePath: ImageSource): Promise<Buffer> {
    const blob = await removeBackground(filePath);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  }
}
