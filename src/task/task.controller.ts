import {
	Body,
	Controller,
	Logger,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { TaskDTO } from "src/common/dtos/task.dto";
import { TaskService } from "./task.service";
import { JwtGuard } from "../auth/jwt/jwt.guard";

@Controller("task")
export class TaskController {
	private readonly logger = new Logger(TaskController.name);
	constructor(private taskService: TaskService) { }

	@Post()
	@UseGuards(JwtGuard)
	async create(@Request() req, @Body() taskDTO: TaskDTO) {
		return this.taskService.create(taskDTO, taskDTO.subject);
	}

	@Patch("/:taskID")
	@UseGuards(JwtGuard)
	async update(@Param('taskID') taskID: string, @Body() taskDTO: Partial<TaskDTO>) {
		return this.taskService.update(taskID, taskDTO);
	}
}