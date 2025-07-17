import { Router, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

// Fixed limit windows with server timing
const simplestLimiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  limit: 10, // Limit each IP to 10 requests per `window` per 15 seconds
  standardHeaders: "draft-8", // RateLimit headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // How many bits of IPv6 addresses to use in key generator for user identification
});

const router: Router = Router();

router.get("/spam-simple", simplestLimiter, (_: Request, res: Response) => {
  res.send("Success");
});

router.get("/spam", (_: Request, res: Response) => {
  res.send("Success");
});

export default router;
