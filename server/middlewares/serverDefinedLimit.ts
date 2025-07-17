import { Request, Response, NextFunction } from "express";
import { getRemainingTime } from "../utils/serverClock";

const limitStorage = new Map<string, number>();

interface ServerDefinedLimitOptions {
  windowMs?: number;
  limit?: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
  legacyHeaders?: boolean;
}

function setRateLimitHeaders(
  res: Response,
  limit: number,
  windowMs: number,
  newCount: number,
  legacyHeaders: boolean
) {
  const resetTime = getRemainingTime();
  const remainingRequests = limit - newCount < 0 ? 0 : limit - newCount;

  if (legacyHeaders) {
    res.setHeader("Retry-After", resetTime);
    res.setHeader("X-RateLimit-Remaining", remainingRequests);
    res.setHeader("X-RateLimit-Reset", windowMs);
  }

  res.setHeader(
    "RateLimit",
    `"${limit}-in-${windowMs}; r=${remainingRequests}, t=${resetTime}"`
  );
  res.setHeader(
    "RateLimit-Policy",
    `"${limit}-in-${windowMs}; q=${limit}, w=${windowMs}"`
  );
}

export function serverDefinedLimit(options: ServerDefinedLimitOptions = {}) {
  const {
    windowMs = 15 * 1000, // Window time to limit requests (15 seconds)
    limit = 100, // Limit of requests per window
    message = "Too many requests, please try again later.",
    keyGenerator = (req: Request) => req.ip, // Function to generate key for request
    legacyHeaders = false,
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);

    const rateLimitData = limitStorage.get(key as string);

    if (!rateLimitData) {
      limitStorage.set(key as string, 1);
    } else {
      const newCount = rateLimitData + 1;

      setRateLimitHeaders(res, limit, windowMs, newCount, legacyHeaders);

      if (newCount > limit) {
        return res.status(429).send(message);
      }

      // If current time is between window start and end
      limitStorage.set(key as string, newCount);
      return next();
    }

    setRateLimitHeaders(res, limit, windowMs, 1, legacyHeaders);

    return next();
  };
}

export function resetLimitStorage() {
  limitStorage.clear();
}
