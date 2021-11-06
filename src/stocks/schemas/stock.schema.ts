import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema({ timestamps: true })
export class Stock {
  @Prop()
  name: string;

  @Prop()
  entryPrice: number;

  @Prop()
  exitPrice: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
