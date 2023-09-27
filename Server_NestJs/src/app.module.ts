import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [AuthModule,
    UserModule,
    MessagesModule,
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DBUri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


