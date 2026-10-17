import { ParamData } from '@nestjs/common/decorators/http/route-params.decorator.js';
import * as bcrypt from "bcrypt"
import { hash } from "crypto"





export async function hashpswd(Password:string) {

    return await bcrypt.hash(Password,10)
    
};

export async function hashcomp(Password:string,hash:string){

    return await bcrypt.compare(Password,hash)
}






