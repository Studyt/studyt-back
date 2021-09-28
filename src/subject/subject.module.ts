import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { SubjectController } from './subject.controller';
import { Subject, SubjectSchema } from './subject.model';
import { SubjectService } from './subject.service';
import { User, UserSchema } from 'src/auth/user.model';

@Module({
  controllers: [SubjectController],
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [SubjectService, ConfigService],
})
export class SubjectModule {}
