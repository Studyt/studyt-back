import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { Task } from 'src/task/task.model';
class Grade {
	grade: number;
	weight: number;
}

@Schema()
export class Subject {
	@Prop()
	label: string;

	@Prop()
	name: string;

	@Prop()
	startDate: Date;

	@Prop()
	endDate: Date;

	@Prop()
	exams: number;

	@Prop()
	abscences: number;

	@Prop()
	maxAbscences: number;

	@Prop({
		type: [
			{
				type: SchemaType.Types.ObjectId,
				ref: 'Task',
			},
		],
	})
	tasks: Task[];

	@Prop(
		{ type: [{ weight: { type: Number }, grade: { type: Number } }] }
	)
	grades: {
		grade: Number,
		weight: Number
	}[]
}

export type SubjectDocument = Subject & Document;

export const SubjectSchema = SchemaFactory.createForClass(Subject);
