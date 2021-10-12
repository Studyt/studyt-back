import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './task.model';
import { TaskService } from './task.service';
import { Subject, SubjectSchema } from 'src/subject/subject.model';

@Module({
	controllers: [TaskController],
	imports: [
		MongooseModule.forFeature([
			{ name: Task.name, schema: TaskSchema },
			{ name: Subject.name, schema: SubjectSchema },
		]),
	],
	providers: [TaskService, ConfigService],
})
export class TaskModule { }
