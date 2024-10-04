import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { SignInDto } from './dto/SignInDto';
import { SignUpDto } from './dto/SignUpDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  /**
   * Registers a new user, hashing the password and ensuring uniqueness of username and email.
   * @param {SignUpDto} signUpDto - DTO containing user registration details.
   * @returns {Promise<User>} - Returns the created user (without the password).
   */
  async signUp({ username, password, email, phone }: SignUpDto): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (userByEmail) {
      throw new BadRequestException('Email already exists');
    }

    const userByUsername = await this.userRepository.findOne({
      where: { username },
    });

    if (userByUsername) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    // Remove password from the returned user object
    user.password = undefined;

    return user;
  }

  /**
   * Authenticates a user using email and password.
   * @param {SignInDto} signInDto - DTO containing login details (email and password).
   * @returns {Promise<{ token: string }>} - Returns a JWT token on successful login.
   */
  async login({ email, password }: SignInDto): Promise<{ token: string }> {
    const user = await this.userRepository
      .scope('withPassword')
      .findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
