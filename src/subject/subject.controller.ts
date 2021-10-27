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
import { SubjectDTO } from "src/common/dtos/subject.dto";
import { SubjectService } from "./subject.service";
import { JwtGuard } from "../auth/jwt/jwt.guard";

@Controller("subject")
export class SubjectController {
  private readonly logger = new Logger(SubjectController.name);
  constructor(private subjectService: SubjectService) { }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() subjectDTO: SubjectDTO) {
    return this.subjectService.create(subjectDTO, req.user.sub);
  }

  @Get()
  @UseGuards(JwtGuard)
  async list(@Request() req) {
    return this.subjectService.list(req.user.sub);
  }

  @Get('/:subjectID')
  @UseGuards(JwtGuard)
  async getOne(@Request() req, @Param('subjectID') subjectID: string) {
    return this.subjectService.getOne(req.user.sub, subjectID);
  }

  @Patch('/:subjectID')
  @UseGuards(JwtGuard)
  async update(@Param('subjectID') subjectID: string, @Body() subjectDTO: Partial<SubjectDTO>) {
    return this.subjectService.update(subjectID, subjectDTO);
  }

  @Patch('/:subjectID/grade')
  @UseGuards(JwtGuard)
  async addGrade(@Param('subjectID') subjectID: string, @Body("weight") weight: number, @Body("grade") grade?: number, @Body("date") date?: Date) {
    return this.subjectService.addGrade(subjectID, weight, grade, date);
  }
}
