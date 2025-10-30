import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Kmer, KmerSchema } from '../../schema/k-mer.schema';
import { KmerRepository } from '../../repositories/k-mer.repository';
import { KmerController } from './kmer.controller';
import { KmerService } from './kmer.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Kmer.name, schema: KmerSchema }])],
    controllers: [KmerController],
    providers: [KmerService, KmerRepository],
    exports: [KmerService, KmerRepository],
})
export class KmerModule {}
