import { ResponseData } from 'src/common/types/response.type';
import { CreatePetDto, CreatePetResponseDto } from '../dto/create-pet.dto';

export interface IPetService {
  createPet(
    createPetDto: CreatePetDto,
    image?: Express.Multer.File,
  ): Promise<ResponseData<CreatePetResponseDto>>;
}
