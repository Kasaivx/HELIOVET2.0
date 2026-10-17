import { registerDTO } from './regester.dto';
import { Injectable } from '@nestjs/common';

import { JwtService } from "@nestjs/jwt";

@Injectable()



export class AuthService {

constructor(private readonly jwtService : JwtService) {}

regsiterClinic(registerDTO){


}



async createAT (userId: string){
    return this.jwtService.signAsync({
        sub: userId
    })
}

}
