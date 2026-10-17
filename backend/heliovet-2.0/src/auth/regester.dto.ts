import { registerDTO } from './regester.dto';
import { IsEmail, MinLength } from 'class-validator';

export class VETregisterDTO {
    
     @IsEmail()
     email!:string;

     @MinLength(8)

     password!:string

     @MinLength()
    
}

export class CLINICregisterDTO {
    
}