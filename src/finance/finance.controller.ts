import { Controller, Get, Param } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('/quote')
  getQuote(@Param('symbols') symbols: string) {
    return this.financeService.getQuote(symbols);
  }

  @Get('/spark')
  getSpark(@Param('symbols') symbols: string) {
    return this.financeService.getSpark(symbols);
  }
  @Get('/chart/:ticker')
  getChart(@Param('ticker') ticker: string) {
    return this.financeService.getChart(ticker);
  }
  @Get('/marketSummary')
  getMarketSummary() {
    return this.financeService.getMarketSummary();
  }

  @Get('/trending/:region')
  getTrendingStocks(@Param('region') region: string) {
    return this.financeService.getTrendingStocks(region);
  }
}
