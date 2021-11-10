import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { UserRole } from '../common/enum';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private usersService: UsersService,
  ) {}

  create(uid: string, createPostDto: CreatePostDto) {
    const newPost = new this.postModel({ ...createPostDto, author: uid });
    return newPost.save();
  }

  async findAll(uid: string, role: UserRole) {
    const query = {} as any;

    if (role === UserRole.TRADER) {
      const user = await this.usersService.findOne(uid);
      const userSubscription = user.subscription.type;
      query.tags = userSubscription;
    }
    return this.postModel
      .find(query)
      .populate('comments')
      .sort({ createdAt: -1 });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
