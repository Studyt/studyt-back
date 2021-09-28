import { ConflictException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDTO } from 'src/common/dtos/subject.dto';
import { Subject, SubjectDocument } from './subject.model';
import { User, UserDocument } from '../auth/user.model';

export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(subjectDTO: SubjectDTO, userID: string): Promise<SubjectDTO> {
    const user = await this.userModel.findById(userID).populate('subjects');
    const sub = user.subjects.find((el) => {
      this.logger.log(el.name, subjectDTO.name);
      return el.name === subjectDTO.name;
    });
    if (sub) throw new ConflictException('Subject alredy exists');

    const subject = await this.subjectModel.create(subjectDTO);
    user.subjects.push(subject);
    user.save();
    return subject;
  }
}
