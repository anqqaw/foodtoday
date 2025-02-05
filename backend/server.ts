import http from 'http';

import { createApp } from './src/app';

import { prisma } from './src/prisma';

const port = process.env.PORT || 9000;

async function initServer() {
  const app = createApp();
  const server = http.createServer(app.callback());

  const cleanResources = async (signal: any) => {
    console.log(`Received ${signal}, closing connections.`);
    try {
      await server.close();
      await prisma.$disconnect();
    } catch (error) {
      console.log(`Error closing connection: ${error}.`);
      process.exit(1);
    }
    process.exit(0);
  };

  process.on('SIGINT', cleanResources);
  process.on('SIGTERM', cleanResources);

  process.on('exit', () => console.log('Exiting.'));

  server.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

initServer().catch((err) => {
  console.error("Error starting server:", err);
});
