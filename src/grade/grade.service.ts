import { NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GradeDTO } from "src/common/dtos/grade.dto";
import { Grade, GradeDocument } from "../grade/grade.model";
import { Subject, SubjectDocument } from "src/subject/subject.model";

export class GradeService {
	private readonly logger = new Logger(GradeService.name);

	constructor(
		@InjectModel(Grade.name)
		private readonly gradeModel: Model<GradeDocument>,
		@InjectModel(Subject.name) private readonly subjectModel: Model<SubjectDocument>
	) { }

	async create(gradeDTO: GradeDTO, subjectID: string): Promise<Grade[]> {
		const subject = await this.subjectModel.findById(subjectID).populate("grades");
		if (!subject) throw new NotFoundException();

		const grade = await this.gradeModel.create({ grade: gradeDTO.grade, weight: gradeDTO.weight });
		subject.grades.push(grade);
		subject.save();
		return subject.grades;
	}

}