import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeneInformationDocument = GeneInformation & Document;
@Schema()
export class GeneInformation {
  @Prop({ required: true })
  geneId: string;

  @Prop({ required: false })
  transcriptName: string;

  @Prop({ required: true })
  geneName: string;

  @Prop({ required: false })
  geneType: string;

  @Prop({ required: false })
  sourceName: string;

  @Prop({ required: false })
  sequence: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const GeneInformationSchema =
  SchemaFactory.createForClass(GeneInformation);
