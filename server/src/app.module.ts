import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';

@Module({
  imports: [],
  controllers: [AppController, UploadsController],
  providers: [AppService, UploadsService],
})
export class AppModule {}
