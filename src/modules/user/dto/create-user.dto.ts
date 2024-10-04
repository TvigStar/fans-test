import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Length,
  IsMobilePhone,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, {
    message: 'Username must be between 3 and 20 characters long',
  })
  @IsAlphanumeric('en-US', {
    message: 'Username can only contain letters and numbers',
  })
  username: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsMobilePhone()
  phone: string;
}
