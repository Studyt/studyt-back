import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task {
	@Prop()
	description: string;

	@Prop()
	dueDate: Date;

	@Prop()
	status: string;

	@Prop()
	subject: string;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
