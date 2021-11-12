import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserQueryParamsDto } from './dto/query-parmas.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() queryParams: UserQueryParamsDto) {
    return this.usersService.findAll(queryParams);
  }

  @Get('/traders')
  @Roles(UserRole.ADMIN)
  findAllTraders(@Query() queryParams: UserQueryParamsDto) {
    queryParams.role = UserRole.TRADER;
    return this.usersService.findAll(queryParams);
  }

  @Get('/me')
  me(@Request() req) {
    const { uid } = req.user;
    return this.usersService.findOne(uid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.usersService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
