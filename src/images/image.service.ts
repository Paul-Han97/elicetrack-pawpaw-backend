import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from 'src/common/constants';
import { UtilService } from 'src/common/utils/util.service';
import { DeleteImageDto } from './dto/delete-image.dto';
import { UploadImageDto, UploadImageResponseDto } from './dto/upload-image.dto';
import { ImageRepository } from './image.repository';
import { IImageRepository } from './interface/image.repository.interface';
import { IImageService } from './interface/image.service.interface';

@Injectable()
export class ImageService implements IImageService {
  private readonly s3Client: S3Client;
  private readonly s3BucketName: string;
  private readonly awsRegion: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,

    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>(ENV_KEYS.AWS_REGION),
      credentials: {
        accessKeyId: this.configService.get<string>(ENV_KEYS.AWS_S3_ACCESS),
        secretAccessKey: this.configService.get<string>(ENV_KEYS.AWS_S3_SECRET),
      },
    });

    this.s3BucketName = this.configService.get<string>(
      ENV_KEYS.AWS_S3_BUCKET_NAME,
    );
    this.awsRegion = this.configService.get<string>(ENV_KEYS.AWS_REGION);
  }

  async uploadImageToS3(
    uploadImageDto: UploadImageDto,
  ): Promise<UploadImageResponseDto> {
    const { entity, imageList } = uploadImageDto;

    const uploadImageResponseDto = new UploadImageResponseDto();

    await Promise.all(
      imageList.map(async (image) => {
        const uuid = this.utilService.uuidGenerator.generate();
        const filename = `${entity.name}/${entity.id}/${uuid}`;
        const ext = this.getFileExt(image);

        const command = new PutObjectCommand({
          Bucket: this.s3BucketName,
          Key: filename,
          Body: image.buffer,
          ContentType: `image/${ext}`,
        });

        const url = `https://s3.${this.awsRegion}.amazonaws.com/${this.s3BucketName}/${filename}`;
        
        uploadImageResponseDto.imageList.push({
          filename,
          url,
          ext,
        });

        return this.s3Client.send(command);
      }),
    );

    return uploadImageResponseDto;
  }

  async deleteImageFromS3(deleteImageDto: DeleteImageDto): Promise<void> {
    await Promise.all(
      deleteImageDto.filename.map((filename) => {
        const command = new DeleteObjectCommand({
          Bucket: this.s3BucketName,
          Key: filename
        });

        return this.s3Client.send(command);
      }),
    );

    return;
  }

  private getFileExt(file: Express.Multer.File): string {
    const filename = file.originalname;
    const index = filename.lastIndexOf('.');
    return filename.slice(index + 1);
  }
}
