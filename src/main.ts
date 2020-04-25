import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './my-logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new MyLogger(),
  });
   
  //TODO security need to explain
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  //app.useLogger(app.get(MyLogger));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  const options = new DocumentBuilder()
  .setTitle('Task example')
  .setDescription('The task API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);

}
bootstrap();
