import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { JoinMode, UserRole, UserStatus } from '../../common/enum';
import { Transform, Type } from 'class-transformer';
import { SubscriptionSchema, Subscription } from './subscription.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop({
    enum: Object.values(UserStatus),
    default: UserStatus.PENDING,
  })
  status: UserStatus;

  @Prop({
    enum: Object.values(UserRole),
    default: UserRole.TRADER,
  })
  role: UserRole;

  @Prop({
    enum: Object.values(JoinMode),
    default: JoinMode.DIRECT,
  })
  joinMode: JoinMode;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Referral',
    default: null,
  })
  referral?: string;

  @Prop({ type: SubscriptionSchema })
  @Type(() => Subscription)
  subscription: Subscription;
}

export const UserSchema = SchemaFactory.createForClass(User);
