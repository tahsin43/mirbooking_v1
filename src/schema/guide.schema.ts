import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Guide extends Document {
  @Prop({ required: true })
  info: string;

  @Prop({ required: true })
  mirId: string;

  @Prop({ required: false })
  organism: string;

  @Prop({ required: false })
  sequence: string;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);
