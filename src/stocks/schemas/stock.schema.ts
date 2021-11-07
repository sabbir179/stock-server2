import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import { SubscriptionType } from 'src/common/enum';

export type StockDocument = Stock & Document;

@Schema({ timestamps: true })
export class Stock {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  entryPrice: number;

  @Prop()
  exitPrice: number;

  @Prop({ enum: Object.values(SubscriptionType) })
  subscriptionType: SubscriptionType;

  @Prop()
  urls: string[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
