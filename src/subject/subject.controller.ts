import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { SubjectDTO } from 'src/common/dtos/subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
	constructor(private subjectService: SubjectService) { }

	@Post('create')
	@HttpCode(200)
	async create(@Body() subjectDTO: SubjectDTO) {
		return this.subjectService.create(subjectDTO);
	}
}