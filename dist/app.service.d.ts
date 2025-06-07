import { Connection } from 'typeorm';
export declare class AppService {
    private connection;
    constructor(connection: Connection);
    testConnection(): Promise<void>;
    getHello(): string;
}
