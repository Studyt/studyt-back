import { IsString, IsNotEmpty, MaxLength, MinLength, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/taskstatus.enum';

export class TaskDTO {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	description: string;

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty()
	dueDate: Date;

	// @IsString()
	@ApiProperty()
	status: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	subject: string;
}

