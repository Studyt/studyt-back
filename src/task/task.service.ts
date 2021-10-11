import { ConflictException, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TaskDTO } from "src/common/dtos/task.dto";
import { Task, TaskDocument } from "./task.model";
import { User, UserDocument } from "../auth/user.model";

export class TaskService {
	private readonly logger = new Logger(TaskService.name);

	constructor(
		@InjectModel(Task.name)
		private readonly taskModel: Model<TaskDocument>,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>
	) { }


}