import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock, StockDocument } from './schemas/stock.schema';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
  ) {}

  create(createStockDto: CreateStockDto) {
    return this.stockModel.create(createStockDto);
  }

  findAll() {
    return this.stockModel.find().exec();
  }

  findOne(id: string) {
    return this.stockModel.findById(id).exec();
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.stockModel
      .findByIdAndUpdate(id, updateStockDto)
      .setOptions({ new: true });
  }

  remove(id: string) {
    return this.stockModel.findOneAndDelete({ _id: id });
  }
}
