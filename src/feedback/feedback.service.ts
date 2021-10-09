import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Feedback, FeedbackDocument } from './feedback.model';
import { FeedbackDTO } from 'src/common/dtos/feedback.dto';
import { User, UserDocument } from 'src/auth/user.model';

export class FeedbackService {
	private readonly logger = new Logger(FeedbackService.name);

	constructor(
		@InjectModel(Feedback.name) private readonly feedbackModel: Model<FeedbackDocument>,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>
	) { }

	async create(feedbackDTO: FeedbackDTO, userID: string) {
		const user = await this.userModel.findById(userID).populate("feedbacks");
		const feedback = await this.feedbackModel.create(feedbackDTO);
		user.feedbacks.push(feedback);
		await user.save();
		return { user, feedback };
	}
}