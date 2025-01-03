import { RequestHandler } from '@nestjs/common/interfaces';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  private readonly sessionOptions: RequestHandler;
  constructor(sessionOptions: RequestHandler) {
    super();

    this.sessionOptions = sessionOptions;
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(5001, options);
    server.engine.use(cookieParser());
    server.engine.use(this.sessionOptions);
    return server;
  }
}
