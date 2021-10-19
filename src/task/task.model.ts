import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from 'src/common/enums/taskstatus.enum';

@Schema()
export class Task {
	@Prop()
	description: string;

	@Prop()
	dueDate: Date;

	@Prop({
		enum: TaskStatus,
		default: TaskStatus.TODO
	})
	status: string;

	@Prop()
	subject: string;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
