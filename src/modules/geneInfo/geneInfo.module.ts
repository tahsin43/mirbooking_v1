import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  GeneInformation,
  GeneInformationSchema,
} from 'src/schema/gene-information.schema';
import { GeneInformationRepository } from '../../repositories/gene-information.repository';
import { GeneInformationController } from './geneInfo.controller';
import { GeneInformationService } from './geneInfo.service';
import { KmerModule } from '../kmer/kmer.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GeneInformation.name, schema: GeneInformationSchema },
    ]),
    KmerModule,
  ],
  controllers: [GeneInformationController],
  providers: [GeneInformationService, GeneInformationRepository],
  exports: [GeneInformationService, GeneInformationRepository],
})
export class GeneInformationModule {}
