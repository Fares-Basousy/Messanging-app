import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
  imports: [AuthModule,MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),ConfigModule.forRoot({isGlobal: true,}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
