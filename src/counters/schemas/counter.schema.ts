import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Counter {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, default: 0 })
  id: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);