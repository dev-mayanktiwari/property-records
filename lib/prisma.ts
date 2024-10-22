import { PrismaClient } from '@prisma/client';

// Add this line to allow the client to be cached globally during development
let prisma: PrismaClient;

declare global {
  // This line ensures the Prisma Client is attached to the global object in development
  // and avoids hot-reloading issues.
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); // In production, create a new instance
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); // Reuse the instance in development
  }
  prisma = global.prisma;
}

export default prisma;