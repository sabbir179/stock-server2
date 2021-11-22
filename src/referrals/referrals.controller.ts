import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Post()
  create(@Request() req, @Body() createReferralDto: CreateReferralDto) {
    const { uid } = req.user;
    return this.referralsService.create(uid, createReferralDto);
  }

  @Get()
  findAll(@Request() req) {
    const { uid } = req.user;
    return this.referralsService.findAll(uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referralsService.findOne(id);
  }
}
