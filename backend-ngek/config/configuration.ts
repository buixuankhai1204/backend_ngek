import * as process from 'process';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
  port: parseInt(process.env.PORT ,10) || 3000,
  database: {
    host: process.env.host,
    port: parseInt(process.env.port, 10) || 27107
  }
});