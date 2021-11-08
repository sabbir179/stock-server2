import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockDto } from './dto/create-stock.dto';
import { StockQueryParamsDto } from './dto/stock-query-params.dto';
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

  async findAll(queryParams: StockQueryParamsDto) {
    const { subscriptionType, page, limit } = queryParams;
    const filters = {} as any;
    if (subscriptionType) {
      filters.subscriptionType = subscriptionType;
    }

    const count = await this.stockModel.count(filters);
    const results = await this.stockModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt');

    return {
      data: results,
      meta: { totalPage: Math.ceil(count / limit), currentPage: page },
    };
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
