import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'JWT_TOKEN',
      useFactory: (configService: ConfigService) => configService.get<string>('JWT_SECRET'),
      inject: [ConfigService],
    },
  ]
})
export class AuthModule { }
