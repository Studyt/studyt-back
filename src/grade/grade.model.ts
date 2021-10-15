import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Grade {

	@Prop()
	grade: number;

	@Prop({ default: 1 })
	weight: number;
}

export type GradeDocument = Grade & Document;

export const GradeSchema = SchemaFactory.createForClass(Grade);
