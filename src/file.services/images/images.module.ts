import { Module } from '@nestjs/common';
import { FileImagesService } from './images.service';
import { FileService } from '../file/file.service';
import { BucketService } from '../bucket/bucket.service';
import { FileModule } from '../file/file.module';
import { BucketModule } from '../bucket/bucket.module';

@Module({
  imports: [FileModule, BucketModule],
  providers: [FileImagesService],
  exports: [FileImagesService],
})
export class ImagesModule {}
