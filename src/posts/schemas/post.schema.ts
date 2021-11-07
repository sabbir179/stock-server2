import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
