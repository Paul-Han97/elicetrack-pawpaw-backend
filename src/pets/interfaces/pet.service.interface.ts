import { ResponseData } from 'src/common/types/response.type';
import { CreatePetDto, CreatePetResponseDto } from '../dto/create-pet.dto';
import { UpdatePetDto, UpdatePetResponseDto } from '../dto/update-pet.dto';

export interface IPetService {
  createPet(
    createPetDto: CreatePetDto,
  ): Promise<ResponseData<CreatePetResponseDto>>;

  updatePet(
    updatePetDto: UpdatePetDto,
  ): Promise<ResponseData<UpdatePetResponseDto>>;

  deletePet(id: number): Promise<ResponseData>;
}
