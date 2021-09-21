import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailProducerService {
	constructor(@InjectQueue('@studyt-mail') private queue: Queue) {}

	async sendMail(html: string, to: string) {
		this.queue.add('@studyt-sendMail', {
			html,
			to,
		}, {
			delay: 3000
		});
	}
}
