import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as qs from 'query-string';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly requestConfig = {} as AxiosRequestConfig;
  private readonly basicAuth = {} as { username: string; password: string };
  constructor(private httpService: HttpService) {
    this.requestConfig = this.getRequestConfig();
    this.basicAuth = this.requestConfig.auth;
  }

  private getRequestConfig() {
    const config = {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return config;
  }

  async getAccessToken(): Promise<string> {
    const url = `${process.env.PAYPAL_API_BASE_URL}/oauth2/token`;
    const data = qs.stringify({ grant_type: 'client_credentials' });
    const res = await lastValueFrom(
      this.httpService
        .post(url, data, {
          auth: this.basicAuth,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .pipe(map((res) => res.data)),
    );
    return res.access_token;
  }

  async getPlans() {
    const url = `${process.env.PAYPAL_API_BASE_URL}/billing/plans`;
    return this.httpService
      .get(url, this.requestConfig)
      .pipe(map((res) => res.data));
  }

  async getPlan(id: string) {
    const url = `${process.env.PAYPAL_API_BASE_URL}/billing/plans/${id}`;
    return this.httpService
      .get(url, this.requestConfig)
      .pipe(map((res) => res.data));
  }
}
