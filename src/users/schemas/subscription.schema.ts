import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';
import { SubscriptionType } from '../../common/enum';
import { Transform } from 'class-transformer';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, type: Date })
  expiryDate: Date;

  @Prop({
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.FREE,
  })
  type: SubscriptionType;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
