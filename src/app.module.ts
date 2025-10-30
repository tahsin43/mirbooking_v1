import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { GuideModule } from './modules/guide/guide.module';
import { KmerModule } from './modules/kmer/kmer.module';
import { GeneInformationModule } from './modules/geneInfo/geneInfo.module';
import { InteractionModule } from './modules/interaction/interaction.module';

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mirbooking_db'),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     configService.getMongoConfig() as MongooseModuleAsyncOptions,
    // }),
    KmerModule,
    GuideModule,
    InteractionModule,
    GeneInformationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
