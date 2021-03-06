import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(helmet());

	const config = new DocumentBuilder()
		.setTitle('Studyt')
		.setDescription('API para a aplicação Studyt')
		.setVersion('0.0')
		.addTag('studyt')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	app.useGlobalPipes(new ValidationPipe());
	app.enableShutdownHooks();
	app.enableCors();

	await app.listen(1234);
}
bootstrap();
