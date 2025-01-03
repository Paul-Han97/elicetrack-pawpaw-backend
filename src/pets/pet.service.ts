import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import {
  ERROR_MESSAGE,
  GENDER_TYPE,
  GENDER_TYPE_INDEX,
  PET_SIZE_TYPE,
  PET_SIZE_TYPE_INDEX,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { Gender } from 'src/genders/entities/gender.entity';
import { GenderRepository } from 'src/genders/gender.repository';
import { IGenderRepository } from 'src/genders/interfaces/gender.repository.interface';
import { DeleteImageDto } from 'src/images/dto/delete-image.dto';
import { UploadImageDto } from 'src/images/dto/upload-image.dto';
import { Image } from 'src/images/entities/image.entity';
import { ImageRepository } from 'src/images/image.repository';
import { ImageService } from 'src/images/image.service';
import { IImageRepository } from 'src/images/interface/image.repository.interface';
import { IImageService } from 'src/images/interface/image.service.interface';
import { PetImage } from 'src/pet-images/entities/pet-image.entity';
import { IPetImageRepository } from 'src/pet-images/interface/petimage.repository';
import { PetImageRepository } from 'src/pet-images/pet-image.repository';
import { PetSize } from 'src/pet-sizes/entities/pet-size.entity';
import { IPetSizeRepository } from 'src/pet-sizes/interfaces/pet-size..repository.interface';
import { PetSizeRepository } from 'src/pet-sizes/pet-size..repository';
import { User } from 'src/users/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CreatePetDto, CreatePetResponseDto } from './dto/create-pet.dto';
import { UpdatePetDto, UpdatePetResponseDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { IPetRepository } from './interfaces/pet.repository.interface';
import { IPetService } from './interfaces/pet.service.interface';
import { PetRepository } from './pet.repository';

@Injectable()
export class PetService implements IPetService {
  private readonly logger = new Logger(PetService.name);
  constructor(
    @Inject(PetRepository)
    private readonly petRepository: IPetRepository,
    @Inject(GenderRepository)
    private readonly genderRepository: IGenderRepository,
    @Inject(PetSizeRepository)
    private readonly petSizeRepository: IPetSizeRepository,
    @Inject(ImageService)
    private readonly imageService: IImageService,
    @Inject(PetImageRepository)
    private readonly petImageRepository: IPetImageRepository,
    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,
    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,
  ) {}

  async createPet(
    createPetDto: CreatePetDto,
  ): Promise<ResponseData<CreatePetResponseDto>> {
    const { name, age, description, gender, size, userId, image } =
      createPetDto;

    const tempDeleteImageDto = new DeleteImageDto();

    let result = new CreatePetResponseDto();

    try {
      result = await this.dataSource.transaction<CreatePetResponseDto>(
        async (manager: EntityManager): Promise<CreatePetResponseDto> => {
          const imageRepository = manager.withRepository(this.imageRepository);
          const petImageRepository = manager.withRepository(
            this.petImageRepository,
          );
          const petRepository = manager.withRepository(this.petRepository);

          const createPetResponseDto = new CreatePetResponseDto();

          const user = new User();
          user.id = userId;

          const petSize = new PetSize();
          petSize.id = PET_SIZE_TYPE_INDEX[PET_SIZE_TYPE[size]];

          const genderIndex = new Gender();
          genderIndex.id = GENDER_TYPE_INDEX[GENDER_TYPE[gender]];

          const pet = new Pet();
          pet.name = name;
          pet.age = age;
          pet.description = description;
          pet.gender = genderIndex;
          pet.petSize = petSize;
          pet.createdUser = userId.toString();
          pet.user = user;

          const savedPet = await petRepository.save(pet);
          createPetResponseDto.id = savedPet.id;

          if (!image) {
            return createPetResponseDto;
          }

          const uploadImageDto = new UploadImageDto();
          uploadImageDto.entity.id = savedPet.id;
          uploadImageDto.entity.name = Pet.name;
          uploadImageDto.imageList.push(image);

          const uploadedImage =
            await this.imageService.uploadImageToS3(uploadImageDto);
          tempDeleteImageDto.filenameList.push(
            uploadedImage.imageList[0].filename,
          );

          const newImage = new Image();
          newImage.url = uploadedImage.imageList[0].url;
          newImage.createdUser = userId.toString();

          const petImage = new PetImage();
          petImage.pet = savedPet;
          petImage.image = newImage;
          petImage.createdUser = userId.toString();

          await imageRepository.save(newImage);
          await petImageRepository.save(petImage);

          return createPetResponseDto;
        },
      );
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        console.log(tempDeleteImageDto.filenameList);
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }
    const resData: ResponseData<CreatePetResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: result,
    };

    return resData;
  }

  async updatePet(
    updatePetDto: UpdatePetDto,
  ): Promise<ResponseData<UpdatePetResponseDto>> {
    const { id, name, age, description, gender, size, userId, image } =
      updatePetDto;

    const tempDeleteImageDto = new DeleteImageDto();
    let result = new UpdatePetResponseDto();

    try {
      result = await this.dataSource.transaction<UpdatePetResponseDto>(
        async (manager: EntityManager): Promise<UpdatePetResponseDto> => {
          const imageRepository = manager.withRepository(this.imageRepository);
          const petImageRepository = manager.withRepository(
            this.petImageRepository,
          );
          const petRepository = manager.withRepository(this.petRepository);
          const updatePetResponseDto = new UpdatePetResponseDto();

          const pet = await petRepository
            .createQueryBuilder('pet')
            .leftJoinAndSelect('pet.gender', 'gender')
            .leftJoinAndSelect('pet.petSize', 'petSize')
            .leftJoinAndSelect('pet.user', 'user')
            .leftJoinAndSelect('pet.petImage', 'petImage')
            .leftJoinAndSelect('petImage.image', 'image')
            .where('pet.id = :id', { id })
            .getOne();

          if (!pet) {
            throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
          }

          pet.name = name || pet.name;
          pet.age = age || pet.age;
          pet.description = description || pet.description;

          if (gender) {
            const genderIndex = new Gender();
            genderIndex.id = GENDER_TYPE_INDEX[GENDER_TYPE[gender]];
            pet.gender = genderIndex;
          }

          if (size) {
            const petSize = new PetSize();
            petSize.id = PET_SIZE_TYPE_INDEX[PET_SIZE_TYPE[size]];
            pet.petSize = petSize;
          }

          pet.updatedUser = userId.toString();

          const savedPet = await petRepository.save(pet);
          updatePetResponseDto.id = savedPet.id;

          if (!image) {
            const images = pet.petImage || [];
            tempDeleteImageDto.filenameList = images
              .filter((petImage) => petImage?.image?.url)
              .map((petImage) => petImage.image.url.split('/').pop() || '');

            if (tempDeleteImageDto.filenameList.length > 0) {
              await this.imageService.deleteImageFromS3(tempDeleteImageDto);

              for (const petImage of images) {
                await petImageRepository.remove(petImage);
                if (petImage.image) {
                  await imageRepository.remove(petImage.image);
                }
              }
            }
          } else {
            const images = pet.petImage || [];
            tempDeleteImageDto.filenameList = images
              .filter((petImage) => petImage?.image?.url)
              .map((petImage) => petImage.image.url.split('/').pop() || '');

            if (tempDeleteImageDto.filenameList.length > 0) {
              await this.imageService.deleteImageFromS3(tempDeleteImageDto);

              for (const petImage of images) {
                await petImageRepository.remove(petImage);
                if (petImage.image) {
                  await imageRepository.remove(petImage.image);
                }
              }
            }

            const uploadImageDto = new UploadImageDto();
            uploadImageDto.entity.id = savedPet.id;
            uploadImageDto.entity.name = Pet.name;
            uploadImageDto.imageList.push(image);

            const uploadedImage =
              await this.imageService.uploadImageToS3(uploadImageDto);
            tempDeleteImageDto.filenameList.push(
              uploadedImage.imageList[0].filename,
            );

            const newImage = new Image();
            newImage.url = uploadedImage.imageList[0].url;
            newImage.createdUser = userId.toString();
            newImage.updatedUser = userId.toString();

            const petImage = new PetImage();
            petImage.pet = savedPet;
            petImage.image = newImage;
            petImage.createdUser = userId.toString();
            petImage.updatedUser = userId.toString();

            await imageRepository.save(newImage);
            await petImageRepository.save(petImage);
          }

          return updatePetResponseDto;
        },
      );
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }

    const resData: ResponseData<CreatePetResponseDto> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: result,
    };

    return resData;
  }

  async deletePet(id: number): Promise<ResponseData> {
    const tempDeleteImageDto = new DeleteImageDto();

    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const petRepository = manager.withRepository(this.petRepository);
        const petImageRepository = manager.withRepository(
          this.petImageRepository,
        );
        const imageRepository = manager.withRepository(this.imageRepository);

        const pet = await petRepository
          .createQueryBuilder('pet')
          .leftJoinAndSelect('pet.petImage', 'petImage')
          .leftJoinAndSelect('petImage.image', 'image')
          .where('pet.id = :id', { id })
          .getOne();

        if (!pet) {
          throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
        }

        const images = pet.petImage || [];
        tempDeleteImageDto.filenameList = images
          .filter((petImage) => petImage?.image?.url)
          .map((petImage) => petImage.image.url.split('/').pop() || '');

        if (tempDeleteImageDto.filenameList.length > 0) {
          await this.imageService.deleteImageFromS3(tempDeleteImageDto);
        }

        const petImageIds = images
          .map((petImage) => petImage.id)
          .filter(Boolean);
        const imageIds = images
          .map((petImage) => petImage.image?.id)
          .filter(Boolean);

        if (petImageIds.length > 0) {
          await petImageRepository.delete(petImageIds);
        }

        if (imageIds.length > 0) {
          await imageRepository.delete(imageIds);
        }

        await petRepository.delete(id);
      });
    } catch (e) {
      if (tempDeleteImageDto.filenameList.length > 0) {
        await this.imageService.deleteImageFromS3(tempDeleteImageDto);
      }
      throw e;
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: { id },
    };

    return resData;
  }
}
