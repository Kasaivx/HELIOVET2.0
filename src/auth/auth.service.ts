import { PrismaService } from './../prisma/prisma.service.js';
import { CLINICregisterDTO, OWNERregisterDTO, type loginDTO,} from './regester.dto.js';
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { hashcomp } from './security/hash.service.js';
import { hashpswd } from './security/hash.service.js';
import { JwtService } from "@nestjs/jwt";
import { CnanoidGEN, VnanoidGEN, OnanoidGEN } from './security/nanoid.service.js';
import { text } from 'stream/consumers';
import { error } from 'console';
import { BadRequestException } from '@nestjs/common';
import { animationFrameScheduler } from 'rxjs';

@Injectable()



export class AuthService {

constructor(
private readonly jwtService : JwtService,
private readonly PrismaService : PrismaService

) {}

async regsiterClinic(dto:CLINICregisterDTO){

const EM = dto.email
const PHN = dto.phone
const USRNM = dto.username
const RC = dto.rc
const PSWRD = dto.password
const  NIN = dto.nin
const VL  = dto.vet
const location = dto.location
const schudule = dto.schudule
const VI = dto.vet
const CN = dto.clinic


   const usedEM = await this.PrismaService.db.orm.public.User.where({email:EM}).first()

const usedPHN = await this.PrismaService.db.orm.public.User.where({phone:PHN}).first()

const usedUSRNM = await this.PrismaService.db.orm.public.User.where({username:USRNM}).first()

 
   if (usedEM){
      throw new   ConflictException("email already in use")
   }

     if (usedPHN){
      throw new   ConflictException("phone number already in use")
   }

   if (usedUSRNM){
      throw new ConflictException('username already exist')
   }

try{

   const hashedpswrd = await hashpswd(PSWRD)


return await this.PrismaService.db.transaction(async(tx) => {
   const user = await tx.orm.public.User.create({
email:EM,
password:hashedpswrd,
phone:PHN,
username:USRNM,
role:'VET', 
   })

const clinic = await tx.orm.public.Clinic.create({
userId:user.id,
clinicname:CN,
nid:CnanoidGEN(),
NIN:NIN,
RC:RC,
status:'PENDING',


})

const WSCH = await tx.orm.public.WorkingSchedule.create({
   clinicid:clinic.id,
   workingDays:schudule.workingDays,
startTime:schudule.startTime,
endTime:schudule.endTime
})


const clinicLocation = await tx.orm.public.Location.create({
 
   clinicId:clinic.id,
   latitude:location.latitude,
   longitude:location.longitude,
   name:clinic.clinicname,
})

const vet = await tx.orm.public.Vet.create({
   fullName:VI.fullname,
   phone:VI.phone,
   clinicId:clinic.id,
   userId:user.id,
   NIN:VI.nin,
   licenseUrl:VI.vetlincese,
   isSuper:true
})

return { message: 'Clinic registered successfully',
  userUN: user.username,
  clinicNID: clinic.nid,
};


})
}catch (error) {
  if (error instanceof Error) {
    throw new BadRequestException(error.message);
  }

  throw new BadRequestException('Registration failed');
}





}


async loginfn(dto:loginDTO){

   const LGNEM = dto.email
   const LGPSWD = dto.password

   const loggedIn = await this.PrismaService.db.orm.public.User.where({email:LGNEM}).first()


   if (!loggedIn){
      throw new Error(
        "this account doesnt exist if you dont have an account please creat one"
      )
   }
const userPSWD = loggedIn.password

const comphash = await hashcomp(LGPSWD,userPSWD)

if (!comphash){
  throw new Error('Invalid credentials');
}
const payload ={
sub:loggedIn.id,
role:loggedIn.role,
}

const token = await this.jwtService.signAsync(payload);

return {message:"login was succed",token}






}

async ownerResgter(dto:OWNERregisterDTO) {

   const OEM = dto.email
   const OPSWRD = dto.password
   const PHN = dto.phone
   const  USRN = dto.username
   const NM = dto.name
   const ADRS = dto.address

   const isUsed = await this.PrismaService.db.orm.public.User.where({email:OEM}).first()
   const isUsedPHN = await this.PrismaService.db.orm.public.User.where({phone:PHN}).first()
   const isUSRN = await this.PrismaService.db.orm.public.User.where({username:USRN}).first()
    
   if(isUsed){
throw new ConflictException("this email is already linked to an account please use another email")
   }
if(isUsedPHN){
   throw new ConflictException("this phone number is already linked to an account please use another one")
}
if(isUSRN){
   throw new ConflictException("this username is already in use please choose another username")
}
  const OHSHPWRD = await hashpswd(OPSWRD)

  return await this.PrismaService.db.transaction(async (tx) =>{
   const user = await tx.orm.public.User.create({
       email:OEM,
   password:OHSHPWRD,
   phone:PHN,
   username:USRN,
   role:'OWNER'
      
   })

const owner = await tx.orm.public.Owner.create({
   userId:user.id,
   phone:user.phone,
   name:NM,
   isGuest:false,
   nid:OnanoidGEN(),
   address: ADRS,

})
 


return { message: 'owner registered successfully',
  userUN: user.username,
  clinicNID: owner.nid,}

  })




}
}