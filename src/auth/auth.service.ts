import { Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth.service.interface";

@Injectable()
export class AuthService implements IAuthService {
    constructor(){}
}