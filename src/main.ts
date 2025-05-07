import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    

    const API_PREFIX = 'api/v1';
    app.setGlobalPrefix(API_PREFIX);

    app.enableCors();

    const rootConfig = new DocumentBuilder()
        .setTitle('Specilisterne Chat App API')
        .setDescription('The backend API description')
        .setVersion('0.1')
        .addTag('Main API')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'access-token',
        )
        .build();

    const rootDocument = SwaggerModule.createDocument(app, rootConfig);
    SwaggerModule.setup(API_PREFIX, app, rootDocument);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
