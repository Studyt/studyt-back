import { Processor, Process } from '@nestjs/bull';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Job } from 'bull';

@Processor('@studyt-mail')
export class MailConsumer {
  constructor(
    @InjectSendGrid() private readonly sendGridClient: SendGridService,
  ) {}

  @Process('@studyt-sendMail')
  mailJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
