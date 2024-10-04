import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Length,
  Matches,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(3, 20, {
    message: 'Username must be between 3 and 20 characters long',
  })
  @IsAlphanumeric('en-US', {
    message: 'Username can only contain letters and numbers',
  })
  username: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone()
  phone?: string;
}
