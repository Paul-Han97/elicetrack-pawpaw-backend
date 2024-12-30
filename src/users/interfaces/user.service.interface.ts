import { ResponseData } from 'src/common/types/response.type';
import { DuplicateNicknameQueryDto } from '../dto/duplicate-nickname.dto';

export interface IUserService {
  checkDuplicateNickname(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData>;
}
