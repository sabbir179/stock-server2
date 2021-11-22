import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class FinanceService {
  private readonly config = {};
  constructor(private readonly httpService: HttpService) {
    this.config = {
      headers: {
        'x-api-key': process.env.FINANCE_API_KEY,
      },
    };
  }

  getQuote(symbols: string) {
    const url = `${process.env.FINANCE_API_BASE_URL}/v6/finance/quote`;
    const config = {
      ...this.config,
      params: { symbols },
    };
    return this.httpService.get(url, config).pipe(map((res) => res.data));
  }

  getSpark(symbols: string) {
    const url = `${process.env.FINANCE_API_BASE_URL}/v8/finance/spark`;
    const config = {
      ...this.config,
      params: { symbols },
    };
    return this.httpService.get(url, config).pipe(map((res) => res.data));
  }

  getChart(ticker: string) {
    const url = `${process.env.FINANCE_API_BASE_URL}/v8/finance/chart/${ticker}`;
    return this.httpService.get(url, this.config).pipe(map((res) => res.data));
  }

  getMarketSummary() {
    const url = `${process.env.FINANCE_API_BASE_URL}/v6/finance/quote/marketSummary`;
    return this.httpService.get(url, this.config).pipe(map((res) => res.data));
  }

  getTrendingStocks(region: string) {
    const url = `${process.env.FINANCE_API_BASE_URL}/v1/finance/trending/${region}`;
    return this.httpService.get(url, this.config).pipe(map((res) => res.data));
  }
}
