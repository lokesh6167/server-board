import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private connection: Connection,
  ) {
    this.testConnection();
  }

  async testConnection() {
    try {
      const isConnected = this.connection.isConnected;
      console.log('Database connection status:', isConnected);
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
