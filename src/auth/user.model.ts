import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { Feedback } from 'src/feedback/feedback.model';
import { Subject } from '../subject/subject.model';

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({
    type: [
      {
        type: SchemaType.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  })
  subjects: Subject[];

  @Prop({
    type: [
      {
        type: SchemaType.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  })
  feedbacks: Feedback[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
