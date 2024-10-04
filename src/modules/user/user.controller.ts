import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} user - DTO containing user creation details.
   * @returns {Promise<{ message: string; data: User }>} - Returns a message and the created user data.
   * @throws {HttpException} - Throws a Bad Request exception if user creation fails.
   */
  @Post('add-user')
  async createUser(
    @Body() user: CreateUserDto,
  ): Promise<{ message: string; data: User }> {
    try {
      const createdUser = await this.userService.createUser(user);
      console.log(`User created successfully: ${createdUser}`);

      return {
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User creation failed',
          message: error.message || 'An error occurred',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Retrieves a list of all users.
   * @returns {Promise<User[]>} - Returns a list of users.
   */
  @Get('all-users')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  /**
   * Retrieves a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} - Returns the user with the specified ID.
   * @throws {NotFoundException} - Throws an error if the user is not found.
   */
  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
