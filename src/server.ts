import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app';
import config from './config/index';
// import { console, logger } from './shared/logger';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('DB Connected on Successfully');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main().catch(err => console.error(err));

process.on('SIGTERM', () => {
  console.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
