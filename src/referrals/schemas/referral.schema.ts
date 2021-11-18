import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from '../../users/schemas/user.schema';

export type ReferralDocument = Referral & Document;

@Schema({ timestamps: true })
export class Referral {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, default: null })
  @Type(() => User)
  referee?: User;

  @Prop({ required: true })
  refereeEmail: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, default: null })
  @Type(() => User)
  referrer?: User;

  @Prop({ required: true, type: Date })
  expiresIn: Date;
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
