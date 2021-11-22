import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId } from 'mongoose';
import { CreditCardType } from '../../common/enum';
import { Transform } from 'class-transformer';

export type CreditDocument = CreditCard & Document;

@Schema({ timestamps: true })
export class CreditCard {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, type: Date })
  expiryDate: Date;

  @Prop({ required: true })
  holderName: string;

  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cvv: string;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({
    enum: Object.values(CreditCardType),
    default: CreditCardType.PAYPAL,
  })
  type: CreditCardType;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
