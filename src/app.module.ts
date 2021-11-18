import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ReferralsModule } from './referrals/referrals.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DSN),
    UsersModule,
    PostsModule,
    StocksModule,
    AuthModule,
    CommonModule,
    ReferralsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
