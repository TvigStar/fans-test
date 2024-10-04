import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignInDto';
import { SignUpDto } from './dto/SignUpDto';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login a user with email and password.
   * @param {SignInDto} loginDto - DTO containing email and password for authentication.
   * @returns {Promise<{ accessToken: string }>} - Returns an access token.
   */
  @Post('login')
  async login(@Body() loginDto: SignInDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  /**
   * Register a new user.
   * @param {SignUpDto} signUpDto - DTO containing user registration details.
   * @returns {Promise<{ message: string; data: User }>} - Returns a message and the created user data.
   */
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }
}
