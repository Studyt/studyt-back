import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class GradeDTO {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	grade: number;

	@IsNumber()
	@ApiProperty()
	weight: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	subject: string;
}

