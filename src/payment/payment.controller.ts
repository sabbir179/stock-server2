import { Controller, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('/token')
  token() {
    return this.paymentService.getAccessToken();
  }
  @Get('/plans')
  plans() {
    return this.paymentService.getPlans();
  }

  @Get('/plans/:id')
  plan(@Param('id') id: string) {
    return this.paymentService.getPlan(id);
  }
}
