import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.MESSAGE_QUEUE],
      queue: 'cats_queue',
      noAck: false,
      queueOptions: {
        durable: false
      },
    },
  });
  app.listen(() => console.log('consumer microservice is listening '));
}
bootstrap();
