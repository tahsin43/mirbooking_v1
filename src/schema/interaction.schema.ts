import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Interaction extends Document {
  @Prop({ type: String })
  guideSeq: string;

  @Prop({ type: String })
  targetSeq: string;

  @Prop({ type: String })
  seedType: string;

  @Prop({ type: String })
  deltaG: string;

  @Prop({ type: String })
  boxA: string;

  @Prop({ type: String })
  boxB: string;

  @Prop({ type: String })
  boxC: string;

  @Prop({ type: String })
  boxD: string;

  @Prop({ type: String })
  miscore: string;

  @Prop({ type: String })
  bridge: string;

  @Prop({ type: String })
  suppBps: string;

  @Prop({ type: String })
  extBps: string;

  @Prop({ type: String })
  suppGU: string;

  @Prop({ type: String })
  bulgeNtsSupp: string;

  @Prop({ type: String })
  bulgesTarget: string;

  @Prop({ type: String })
  bulgesGuide: string;

  @Prop({ type: String })
  structure: string;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
