import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subject {
	@Prop({ unique: true })
	label: string;

	@Prop()
	name: string;

	@Prop()
	startDate: Date;

	@Prop()
	endDate: Date;

	@Prop()
	exams: number;
}

export type SubjectDocument = Subject & Document;

export const SubjectSchema = SchemaFactory.createForClass(Subject);
