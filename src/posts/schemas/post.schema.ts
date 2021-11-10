import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Comment } from './comment.schema';
import { SubscriptionType } from '../../common/enum';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([{ type: String, enum: Object.values(SubscriptionType) }])
  tags: SubscriptionType[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }])
  @Type(() => Comment)
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
