import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class FeedbackDTO {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	nps: number;

	@IsString()
	@ApiProperty()
	feedback: string;
}

