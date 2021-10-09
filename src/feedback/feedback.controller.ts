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
import { JwtGuard } from "src/auth/jwt/jwt.guard";
import { FeedbackDTO } from "src/common/dtos/feedback.dto";
import { FeedbackService } from "./feedback.service";

@Controller("feedback")
export class FeedbackController {
	private readonly logger = new Logger(FeedbackController.name);
	constructor(private feedbackService: FeedbackService) { }

	@Post()
	@UseGuards(JwtGuard)
	async create(@Request() req, @Body() feedbackDTO: FeedbackDTO) {
		return this.feedbackService.create(feedbackDTO, req.user.sub);
	}
}
