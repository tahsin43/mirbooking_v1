import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Guide, GuideSchema } from '../../schema/guide.schema';
import { GuideRepository } from '../../repositories/guide.repository';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
  ],
  controllers: [GuideController],
  providers: [GuideService, GuideRepository],
  exports: [GuideService, GuideRepository],
})
export class GuideModule {}
