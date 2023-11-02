import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  public fullname!: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(7, 100)
  @IsNotEmpty()
  public password: string;

  @IsString()
  public user_image!: string;

  @IsString()
  @MaxLength(100)
  public description!: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @Length(7, 100)
  @IsNotEmpty()
  public password: string;
}
