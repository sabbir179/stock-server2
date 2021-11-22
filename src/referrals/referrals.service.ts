import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { Referral, ReferralDocument } from './schemas/referral.schema';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(uid: string, createReferralDto: CreateReferralDto) {
    const { email } = createReferralDto;
    const currentDate = new Date();
    const newReferral = {
      refereeEmail: email,
      referrer: uid,
      expiresIn: new Date(currentDate.setDate(currentDate.getDate() + 7)),
    };

    const createdReferral = await this.referralModel.create(newReferral);

    const referralLink = `${process.env.CLIENT_BASE_URL}/auth/sign-up?referral=${createdReferral._id}`;
    this.mailService.sendReferralEmail(referralLink, email);
    return {
      referralCode: createdReferral._id,
    };
  }

  async validateReferral(referralCode: string, email: string) {
    const referral = await this.findOne(referralCode);
    if (referral.referee) {
      throw new HttpException(
        'Referral code has been used.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentTime = new Date().getTime();
    if (
      referral.refereeEmail !== email ||
      referral.expiresIn.getTime() < currentTime
    ) {
      throw new HttpException(
        'Referral code is invalid or has expired.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll(uid: string) {
    return this.referralModel.find().where('referrer').equals(uid);
  }

  async findOne(id: string) {
    const referral = await this.referralModel.findById(id);
    if (!referral) {
      throw new HttpException('Referral does not exist.', HttpStatus.NOT_FOUND);
    }
    return referral;
  }

  update(id: string, updateReferralDto: UpdateReferralDto) {
    return this.referralModel.findByIdAndUpdate(id, updateReferralDto);
  }
}
