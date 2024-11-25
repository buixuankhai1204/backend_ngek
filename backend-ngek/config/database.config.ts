import { registerAs } from '@nestjs/config';

export default registerAs('database', () => (
  {
    database_host: process.env.HOST,
    database_port: process.env.DATABASE_PORT || 5432,
  }));
