import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from 'src/common/enum';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const { userId } = req.user;
    return this.postsService.create(userId, createPostDto);
  }

  @Post(':id/comments')
  createComment(
    @Request() req,
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user;
    return this.commentsService.create(id, userId, createCommentDto);
  }

  @Get()
  findAll(@Request() req) {
    const { userId, role } = req.user;
    return this.postsService.findAll(userId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
