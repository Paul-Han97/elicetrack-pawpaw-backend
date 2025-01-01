import { ResponseData } from 'src/common/types/response.type';
import { CreatePetDto, CreatePetResponseDto } from '../dto/create-pet.dto';

export interface IPetService {
  createPet(
    createPetDto: CreatePetDto,
    userId: number,
    image?: Express.Multer.File,
  ): Promise<ResponseData<CreatePetResponseDto>>;
}
