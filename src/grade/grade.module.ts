import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { GradeController } from './grade.controller';
import { Grade, GradeSchema } from './grade.model';
import { GradeService } from './grade.service';
import { Subject, SubjectSchema } from 'src/subject/subject.model';

@Module({
	controllers: [GradeController],
	imports: [
		MongooseModule.forFeature([
			{ name: Grade.name, schema: GradeSchema },
			{ name: Subject.name, schema: SubjectSchema },
		]),
	],
	providers: [GradeService, ConfigService],
})
export class GradeModule { }
