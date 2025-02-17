import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: String })
  userId: string;

  @Prop({ type: String })
  invoiceId: string;

  @Prop({ type: Date })
  timestamp: Date;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
