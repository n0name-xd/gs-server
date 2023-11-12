import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.findAll({ include: { all: true } });

    return users;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);

    return user;
  }

  async removeById(id: number) {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    await user.destroy();

    return user;
  }
}
