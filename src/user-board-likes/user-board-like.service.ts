import { Inject, Injectable } from '@nestjs/common';
import { CreateUserboardlikeDto } from './dto/create-userboardlike.dto';
import { UpdateUserboardlikeDto } from './dto/update-userboardlike.dto';
import { UserBoardLikeRepository } from './user-board-like.repository';
import { IUserBoardLikeRepository } from './interface/user-board-like.repository.interface';
import { IUserBoardLikeService } from './interface/user-board-like.service.interface';

@Injectable()
export class UserBoardLikeService implements IUserBoardLikeService {
  constructor(
    @Inject(UserBoardLikeRepository)
    private readonly userBoardLikeRepository: IUserBoardLikeRepository,
  ) {}
}
