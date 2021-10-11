import {
	Body,
	Controller,
	Get,
	Patch,
	Logger,
	Post,
	Request,
	UseGuards,
	Param
} from "@nestjs/common";
import { TaskDTO } from "src/common/dtos/task.dto";
import { TaskService } from "./task.service";
import { JwtGuard } from "../auth/jwt/jwt.guard";

@Controller("task")
export class TaskController {
	private readonly logger = new Logger(TaskController.name);
	constructor(private taskService: TaskService) { }

}