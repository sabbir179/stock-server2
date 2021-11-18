import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  JoinMode,
  SubscriptionType,
  UserRole,
  UserStatus,
} from '../common/enum';
import * as bcrypt from 'bcryptjs';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserQueryParamsDto } from './dto/query-params.dto';
import { ReferralsService } from 'src/referrals/referrals.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private referralsService: ReferralsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, referral } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }

    const currentDate = new Date();
    const subscription = {
      type: SubscriptionType.FREE,
      planId: 'free_123',
      expiryDate: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
    };

    if (referral) {
      await this.referralsService.validateReferral(referral, email);
      createUserDto.joinMode = JoinMode.REFERRAL;
    }
    const createdUser = new this.userModel({
      ...createUserDto,
      subscription,
    });
    const hashed = await bcrypt.hash(password, 10);
    createdUser.password = hashed;
    await createdUser.save();

    if (referral) {
      await this.referralsService.update(referral, {
        referee: createdUser._id,
      });
    }

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

  async findAll(queryParamsDto: UserQueryParamsDto) {
    const { status, role, page, limit } = queryParamsDto;
    const filters = {} as any;
    if (status) {
      filters.status = status;
    }
    if (role) {
      filters.role = role;
    }

    const count = await this.userModel.count(filters);
    const results = await this.userModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt')
      .select('-password');

    return {
      data: results,
      meta: { totalPage: Math.ceil(count / limit), currentPage: page },
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }
    return user;
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
