import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './mail.constants';
import { MailModuleOptions } from './mail.interfaces';
import { MailService } from './mail.service';

@Module({
  imports: [HttpModule],
  providers: [MailService],
})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      exports: [MailService],
      providers: [
        {
          provide: MAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
    };
  }
}
