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
import { UserBoardLikeService } from './userboardlike.service';
import { IUserBoardLikeService } from './interface/userboardlike.service.interface';

@Controller('userboardlike')
export class UserBoardLikeController {
  constructor(
    @Inject(UserBoardLikeService)
    private readonly userboardlikeService: IUserBoardLikeService,
  ) {}
}
