import { JwtService } from '@nestjs/jwt';

import { CanActivate,ExecutionContext,Injectable,UnauthorizedException } from "@nestjs/common";


@Injectable()
export class authJwtGuard implements CanActivate {

    constructor(private readonly jwtService:JwtService){}
 async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

   const header = request.headers.authorization;
   if(!header || !header.startsWith('Bearer ')){
    throw new UnauthorizedException();

   }

   const token = header.split(' ')[1];

   try{
    const payload = await this.jwtService.verifyAsync(token)  
request.user = payload


    
return true;  
}catch{
    throw new UnauthorizedException('invalid or expired token')
}
 }
}
