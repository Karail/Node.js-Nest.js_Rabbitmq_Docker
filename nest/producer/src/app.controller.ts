import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('APP_SERVICE') 
    private client: ClientProxy,
    private readonly appService: AppService
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send<any>('message_printed', 'Hello');
  }
}
