import { DeleteImageDto } from '../dto/delete-image.dto';
import {
  UploadImageDto,
  UploadImageResponseDto,
} from '../dto/upload-image.dto';

export interface IImageService {
  uploadImageToS3(
    uploadImageDto: UploadImageDto,
  ): Promise<UploadImageResponseDto>;

  deleteImageFromS3(deleteImageDto: DeleteImageDto): Promise<void>;
}
