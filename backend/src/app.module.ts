import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot("mongodb://root:123@127.0.0.1:27017", {
          dbName: 'pratical_test'
      }),
      KnightsModule,
  ],
  controllers: [
      AppController,
  ],
  providers: [
      AppService,
  ],
})
export class AppModule {}
