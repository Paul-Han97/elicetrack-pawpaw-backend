import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { CreateUserboardlikeDto } from './dto/create-userboardlike.dto';
import { UpdateUserboardlikeDto } from './dto/update-userboardlike.dto';
import { UserBoardLikeService } from './user-board-like.service';
import { IUserBoardLikeService } from './interface/user-board-like.service.interface';

@Controller('user-board-likes')
export class UserBoardLikeController {
  constructor(
    @Inject(UserBoardLikeService)
    private readonly userboardlikeService: IUserBoardLikeService,
  ) {}
}
