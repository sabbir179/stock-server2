import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async create(
    postId: string,
    uid: string,
    createCommentDto: CreateCommentDto,
  ) {
    const createdComment = await this.commentModel.create({
      ...createCommentDto,
      author: uid,
    });
    return this.postModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: createdComment._id },
      },
      { new: true },
    );
  }
}
