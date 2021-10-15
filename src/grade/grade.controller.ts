import {
	Body,
	Controller,
	Logger,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { GradeDTO } from "src/common/dtos/grade.dto";
import { GradeService } from "./grade.service";
import { JwtGuard } from "../auth/jwt/jwt.guard";

@Controller("grade")
export class GradeController {
	private readonly logger = new Logger(GradeController.name);
	constructor(private gradeService: GradeService) { }

	@Post()
	@UseGuards(JwtGuard)
	async create(@Request() req, @Body() gradeDTO: GradeDTO) {
		return this.gradeService.create(gradeDTO, gradeDTO.subject);
	}
}