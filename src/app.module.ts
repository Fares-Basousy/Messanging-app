import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB-Uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


