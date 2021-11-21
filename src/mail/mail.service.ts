import { Inject, Injectable } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './mail.constants';
import { EmailVariable, MailModuleOptions } from './mail.interfaces';
import { HttpService } from '@nestjs/axios';
import * as qs from 'query-string';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private options: MailModuleOptions,
    private readonly httpService: HttpService,
  ) {}
  private defaultAuthorizedRecipient = 'mohammadrasel1221@gmail.com';

  private async send({
    subject,
    to,
    template,
    variables,
  }: {
    subject: string;
    to: string;
    template: string;
    variables?: EmailVariable[];
  }) {
    try {
      const data = {
        from: `John Doe from Stock Reaper <mailgun@${this.options.domain}>`,
        to: `${to}`,
        subject: `${subject}`,
        template,
      };

      if (variables) {
        for (const variable of variables) {
          data[`v:${variable.key}`] = `${variable.value}`;
        }
      }
      const apiKeyBase64 = Buffer.from(`api:${this.options.apiKey}`).toString(
        'base64',
      );
      const url = `https://api.mailgun.net/v3/${this.options.domain}/messages`;

      await lastValueFrom(
        this.httpService
          .post(url, qs.stringify(data), {
            headers: {
              Authorization: `Basic ${apiKeyBase64}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .pipe(map((res) => res.data)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.send({
      subject: 'Verify Your Email',
      template: 'verify_email',
      to: this.defaultAuthorizedRecipient,
      variables: [
        {
          key: 'username',
          value: email,
        },
        {
          key: 'code',
          value: code,
        },
      ],
    });
  }

  sendReferralEmail(link: string, email = this.defaultAuthorizedRecipient) {
    this.send({
      subject: 'Referral Email',
      template: 'referral_email',
      to: email,
      variables: [
        {
          key: 'referral_link',
          value: link,
        },
      ],
    });
  }
}
