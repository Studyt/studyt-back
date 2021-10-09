import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Feedback {
	@Prop()
	nps: number;

	@Prop()
	feedback: string;

	@Prop({ default: Date.now() })
	createdAt: Date;
}

export type FeedbackDocument = Feedback & Document;

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
