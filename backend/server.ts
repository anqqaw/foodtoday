import http from 'http';
import { Server } from 'socket.io';

import Redis from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';

import { createApp } from './src/app';
import * as sockets from './src/sockets';

import { prisma } from './src/prisma';

import { config } from './src/config';

const port = process.env.PORT || 9000;

async function initServer() {
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Initialize Redis clients
  const pubClient = new Redis(config.REDIS_URL, { family: 6 });
  const subClient = pubClient.duplicate();

  // Apply the Redis adapter
  io.adapter(createAdapter(pubClient, subClient));

  // Initialize the Koa app with io after Redis setup
  const app = createApp(io);
  server.on('request', app.callback());

  sockets.init(io);

  const cleanResources = async (signal: any) => {
    console.log(`Received ${signal}, closing connections.`);
    try {
      await server.close();
      await prisma.$disconnect();
      await pubClient.quit();
      await subClient.quit();
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
