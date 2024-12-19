import { Inject, Injectable } from '@nestjs/common';
import { CreateUserboardlikeDto } from './dto/create-userboardlike.dto';
import { UpdateUserboardlikeDto } from './dto/update-userboardlike.dto';
import { UserBoardLikeRepository } from './userboardlike.repository';
import { IUserBoardLikeRepository } from './interface/userboardlike.repository.interface';

@Injectable()
export class UserBoardLikeService {
  constructor(
    @Inject(UserBoardLikeRepository)
    private readonly userBoardLikeRepository: IUserBoardLikeRepository,
  ) {}
}
