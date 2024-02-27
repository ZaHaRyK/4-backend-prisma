import { Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { BucketService } from '../bucket/bucket.service';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FileImagesService {
  private readonly image: string;
  constructor(
    private readonly prisma: PrismaService,
    private fileServices: FileService,
    private bucketServices: BucketService,
  ) {
    this.image = 'image';
  }

  async appendFiles(files: Express.Multer.File[]) {
    const resFiles: Image[] = [];

    await Promise.all(
      files.map(async (file) => {
        const name = uuidv4();

        file.mimetype = file.originalname.match(/\.(jpg|jpeg|png)$/)[0];

        const fullName = name + file.mimetype;

        const aws_url = await this.bucketServices.appendFileToBucket(
          name,
          file.buffer,
          file.mimetype,
        );

        const resFile = {
          file_name: fullName,
          file_original_name: file.originalname,
          aws_url,
        };

        resFiles.push(<Image>resFile);

        await this.fileServices.appendFileToPublic(fullName, file.buffer);
      }),
    );
    return resFiles;
  }

  async deleteFiles(images: Image[]) {
    images.map((image) => {
      this.bucketServices.deleteFile(image.file_name);
      this.fileServices.deleteFileInPublic(image.file_name);
      this.prisma.image.delete({ where: image });
    });
  }
}
