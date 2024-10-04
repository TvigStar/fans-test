import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  /**
   * Creates a new user, ensuring the username and email are unique.
   * @param {CreateUserDto} createUserDto - DTO containing user creation data.
   * @returns {Promise<User>} - Returns the newly created user.
   * @throws {BadRequestException} - If a user with the same username or email already exists.
   */
  async createUser({ username, email, phone }: CreateUserDto): Promise<User> {
    // Check if a user with the same username already exists
    const userExists = await this.userRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new BadRequestException('User with this username already exists');
    }

    // Check if a user with the same email already exists
    const emailExists = await this.userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new BadRequestException('User with this email already exists');
    }

    return this.userRepository.create({ username, email, phone });
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} - A list of all users.
   */
  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} - The user with the specified ID.
   */
  getUserById(id: string): Promise<User> {
    return this.userRepository.findByPk(id);
  }
}
