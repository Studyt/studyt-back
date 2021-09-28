import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SubjectDTO } from 'src/common/dtos/subject.dto';
import { SubjectService } from './subject.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('subject')
export class SubjectController {
  private readonly logger = new Logger(SubjectController.name);
  constructor(private subjectService: SubjectService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Request() req, @Body() subjectDTO: SubjectDTO) {
    return this.subjectService.create(subjectDTO, req.user.sub);
  }
}
