import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { FeedbackController } from './feedback.controller';
import { Feedback, FeedbackSchema } from './feedback.model';
import { User, UserSchema } from 'src/auth/user.model';
import { FeedbackService } from './feedback.service';

@Module({
	controllers: [FeedbackController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Feedback.name, schema: FeedbackSchema }
		]),
	],
	providers: [FeedbackService, ConfigService],
})
export class FeedbackModule { }