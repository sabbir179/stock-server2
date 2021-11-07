import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserRole } from '../common/enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel({
      ...createUserDto,
      role: UserRole.TRADER,
    });
    const hashed = await bcrypt.hash(password, 10);
    createdUser.password = hashed;
    await createdUser.save();

    return this.sanitize(createdUser);
  }

  async sanitize(user: User) {
    delete user.password;
    return user;
  }

  findAll() {
    return this.userModel.find().select('-password').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
