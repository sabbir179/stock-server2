import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(id);
  }
}
