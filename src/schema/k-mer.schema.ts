import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { GeneInformation } from './gene-information.schema';

@Schema()
export class Kmer extends Document {
  @Prop({ type: String , required: true, unique: true})
  kmerRead: string;

  @Prop({
    type: [{ type: String, ref: 'GeneInformation' }],
  })
  geneInfo: GeneInformation[];

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const KmerSchema = SchemaFactory.createForClass(Kmer);
