// backend/src/config/redis.js

import Redis from "ioredis";
import { logger } from "../utils/logger.js";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => {
  logger.info("Redis Connected");
});

redis.on("ready", () => {
  logger.info("Redis Ready to Use");
});

redis.on("error", (err) => {
  logger.error("Redis Error:", err.message);
});

redis.on("close", () => {
  logger.warn("Redis Connection Closed");
});

export default redis;