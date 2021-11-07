import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { SubscriptionType, UserRole, UserStatus } from '../common/enum';
import * as bcrypt from 'bcrypt';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const currentDate = new Date();
    const subscription = {
      type: SubscriptionType.FREE,
      expiryDate: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
    };
    const createdUser = new this.userModel({ ...createUserDto, subscription });
    const hashed = await bcrypt.hash(password, 10);
    createdUser.password = hashed;
    await createdUser.save();

    return {
      ok: true,
      message: 'Created user successfully',
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto, key: string) {
    const { email, password } = createAdminDto;
    if (key !== process.env.ADMIN_CREATION_KEY) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const user = await this.findByEmail(email);
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdAdmin = new this.userModel({
      ...createAdminDto,
      status: UserStatus.ACTIVE,
      role: UserRole.ADMIN,
    });
    const hashed = await bcrypt.hash(password, 10);
    createdAdmin.password = hashed;
    await createdAdmin.save();

    return {
      ok: true,
      message: 'Created admin successfully',
    };
  }

  updateStatus(id: string, updateStatusDto: UpdateStatusDto) {
    const updatedUser = this.userModel
      .findByIdAndUpdate(id, updateStatusDto)
      .setOptions({ new: true })
      .select('-password');
    return updatedUser;
  }

  findAll() {
    return this.userModel.find().select('-password').exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
