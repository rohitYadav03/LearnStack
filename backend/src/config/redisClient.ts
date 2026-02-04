import type { ConnectionOptions } from "bullmq";

const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT),
  tls: {}
};

// only add password if it exists
if (process.env.REDIS_PASSWORD) {
  connection.password = process.env.REDIS_PASSWORD;
}

export default connection;
