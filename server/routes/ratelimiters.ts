import { Router, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { serverDefinedLimit } from "../middlewares/serverDefinedLimit";

// Fixed limit windows with server timing
const userFixedLimiter = rateLimit({
  windowMs: Number(process.env.TIME_WINDOW), // Env defined
  limit: Number(process.env.LIMIT), // Limit each IP to 10 requests per `window` per env seconds
  standardHeaders: "draft-8", // RateLimit headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // How many bits of IPv6 addresses to use in key generator for user identification
});

const serverFixedLimiter = serverDefinedLimit({
  windowMs: Number(process.env.TIME_WINDOW), // Env defined
  limit: Number(process.env.REQUESTS_LIMIT), // Limit each IP to 10 requests per `window` per env seconds
});

const router: Router = Router();

router.get(
  "/spam-user-fixed",
  userFixedLimiter,
  (_: Request, res: Response) => {
    res.send("User fixed limiter success");
  }
);

router.get(
  "/spam-server-defined",
  serverFixedLimiter,
  (_: Request, res: Response) => {
    res.send("Server fixed limiter success");
  }
);

router.get("/spam", (_: Request, res: Response) => {
  res.send("Success");
});

export default router;
