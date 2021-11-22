import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';
import { PaymentStatus, SubscriptionType } from '../../common/enum';
import { Transform } from 'class-transformer';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, type: Date })
  expiryDate: Date;

  @Prop({ required: true })
  planId: string;

  @Prop({
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.GOLD,
  })
  type: SubscriptionType;
  @Prop({
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.FREE,
  })
  paymentStatus: PaymentStatus;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
