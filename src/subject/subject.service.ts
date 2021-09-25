import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDTO } from 'src/common/dtos/subject.dto';
import { Subject, SubjectDocument } from './subject.model';

export class SubjectService {
	constructor(
		@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>,
	) { }

	async create(subjectDTO: SubjectDTO): Promise<SubjectDTO> {
		if (await this.subjectModel.findOne({ label: subjectDTO.label })) {
			throw new ConflictException('Subject already created');
		}

		const subject = await this.subjectModel.create(subjectDTO);
		return subject;
	}

}
