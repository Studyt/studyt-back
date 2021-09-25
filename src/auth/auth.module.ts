import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt-strategy.service';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from './mail/mail.consumer';
import { MailProducerService } from './mail/mail.producer.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('STUDYT_SECRET'),
        signOptions: {
          expiresIn: '1y',
        },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BullModule.registerQueue({
      name: '@studyt-mail',
    }),
  ],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    MailConsumer,
    MailProducerService,
  ],
})
export class AuthModule { }
