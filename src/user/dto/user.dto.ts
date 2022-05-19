import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

/**
 * * https://www.npmjs.com/package/@nestjs/mapped-types
 * * https://github.com/typestack/class-validator#validation-decorators
 * * PartialType - returns a type (class) with all the properties of the input type set to optional (requirement: at least 1 validation decorator applied to each property)
 * * PickType - constructs a new type (class) by picking a set of properties from an input type
 * * OmitType - constructs a type by picking all properties from an input type and then removing a particular set of keys
 * * IntersectionType - combines two types into one new type (class)
 * * Partial: 부분적인, 불완전한
 * * pick: 고르다
 * * omit: 빠트리다
 * * intersection: 교차
 * */
export class UserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  id: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(30)
  email: string;
}

// * IsJwt()
// * Inheritance UserDto without name and email
export class SigninDto extends OmitType(UserDto, ['name', 'email']) {}

export class SignupDto extends UserDto {}

export class UpdateDto extends PartialType(UserDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  newPassword: string;
}

export class DeleteDto extends SigninDto {}
