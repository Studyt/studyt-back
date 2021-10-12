import { NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TaskDTO } from "src/common/dtos/task.dto";
import { Task, TaskDocument } from "../task/task.model";
import { Subject, SubjectDocument } from "src/subject/subject.model";

export class TaskService {
	private readonly logger = new Logger(TaskService.name);

	constructor(
		@InjectModel(Task.name)
		private readonly taskModel: Model<TaskDocument>,
		@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>
	) { }

	async create(taskDTO: TaskDTO, subjectID: string): Promise<TaskDTO[]> {
		const subject = await this.subjectModel.findById(subjectID).populate("tasks");
		if (!subject) throw new NotFoundException();

		const task = await this.taskModel.create(taskDTO);
		subject.tasks.push(task);
		subject.save();
		return subject.tasks;
	}

}