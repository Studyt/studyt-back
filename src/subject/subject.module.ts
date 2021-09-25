import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { SubjectController } from './subject.controller';
import { Subject, SubjectSchema } from './subject.model';
import { SubjectService } from './subject.service';

@Module({
	controllers: [SubjectController],
	imports: [
		MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }])],
	providers: [
		SubjectService,
		ConfigService,
	],
})
export class SubjectModule { }
