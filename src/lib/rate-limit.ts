import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasUpstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
    })
  : null;

export async function rateLimit(identifier: string) {
  if (!ratelimit) {
    return { success: true, reset: 0, remaining: 0 };
  }

  return ratelimit.limit(`register-provider:${identifier}`);
}
