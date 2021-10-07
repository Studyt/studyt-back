import { IsString, IsNotEmpty, MaxLength, MinLength, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class SubjectDTO {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	@MinLength(4)
	@MaxLength(6)
	label: string;

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty()
	startDate: Date;

	@IsDateString()
	@IsNotEmpty()
	@ApiProperty()
	endDate: Date;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	exams: number;

	@IsNumber()
	@ApiProperty()
	@Min(0)
	abscences: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	@Min(0)
	maxAbscences: number;
}

