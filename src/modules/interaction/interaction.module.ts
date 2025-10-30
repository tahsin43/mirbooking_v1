import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Interaction, InteractionSchema } from 'src/schema/interaction.schema';
import { InteractionController } from './interaction.controller';
import { InteractionService } from './interaction.service';
import { FoldGuideService } from '../mcfold/fold-guide.service';
import { InteractionRepository } from 'src/repositories/interaction.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interaction.name, schema: InteractionSchema },
    ]),
  ],
  controllers: [InteractionController],
  providers: [InteractionService, InteractionRepository, FoldGuideService],
  exports: [InteractionService, InteractionRepository, FoldGuideService],
})
export class InteractionModule {}
