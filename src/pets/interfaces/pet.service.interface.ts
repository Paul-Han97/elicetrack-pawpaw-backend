import { ResponseData } from 'src/common/types/response.type';
import { CreatePetDto, CreatePetResponseDto } from '../dto/create-pet.dto';

export interface IPetService {
  createPet(
    createPetDto: CreatePetDto,
  ): Promise<ResponseData<CreatePetResponseDto>>;
}
