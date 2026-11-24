import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  Length,
  IsIn,
  IsNumber,
  Max,
  Min,
  ValidateNested,
  IsDefined,
} from 'class-validator';

import { Type } from 'class-transformer';

const DAYS_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;


export class daysoftheweekDTO {
  @IsIn(DAYS_OF_WEEK)
  workingDays!: (typeof DAYS_OF_WEEK)[number];

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  startTime!: string;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  endTime!: string;
}

export class locationDTO {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;
}

export class vetDTO {
  @IsString()
  fullname!: string;

  @IsPhoneNumber('DZ')
  phone!: string;

  @Matches(/^\d{18}$/)
  nin!: string;

  @IsString()
  vetlincese!: string;
}



export class CLINICregisterDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(72)
  @IsStrongPassword()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username!: string;

  @IsPhoneNumber('DZ')
  phone!: string;

  @Matches(/^\d{18}$/)
  nin!: string;

  @IsString()
  @IsNotEmpty()
  rc!: string;

  @IsString()
  @IsNotEmpty()
  clinic!: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => daysoftheweekDTO)
  schudule!: daysoftheweekDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => locationDTO)
  location!: locationDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => vetDTO)
  vet!: vetDTO;
}

export class OWNERregisterDTO{


@IsEmail()
email!:string;


@IsString() 
@IsNotEmpty()
@MaxLength(72)
@IsStrongPassword()
 password!:string

 @IsPhoneNumber('DZ')

phone!:string

@IsString()
@IsNotEmpty()
@Length(3,20)
username!:string
@IsString()
@IsNotEmpty()
name!:string

@IsString()
@IsNotEmpty()
address!:string

}

export class loginDTO{

    @IsEmail()
email!:string;


@IsString()
password!:string


}

