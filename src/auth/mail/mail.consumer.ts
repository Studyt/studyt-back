import { Processor, Process } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('@studyt-mail')
export class MailConsumer {
  private readonly logger = new Logger(MailConsumer.name);
  constructor(
    @InjectSendGrid() private readonly sendGridService: SendGridService,
    private readonly configService: ConfigService,
  ) {}

  @Process('@studyt-sendMail')
  mailJob(job: Job<unknown>) {
  	this.logger.log(job.name, job.id);
  	this.sendGridService.send({
  		from: this.configService.get('STUDYT_MAIL'),
  		subject: 'Studyt | Confirmação de Email',
  		html: job.data.html,
  		to: job.data.to
  	});
  }
}
