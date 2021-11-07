import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { UserRole } from '../../common/enum';
import { Transform } from 'class-transformer';

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

  @Prop({ required: true, enum: Object.values(UserRole) })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
