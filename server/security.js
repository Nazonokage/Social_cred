import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

export default function applySecurity(app) {
  app.use(helmet());
  app.use(cors({ 
    origin: "http://localhost:5047", // Remove trailing slash
    credentials: true 
  }));
  app.use(rateLimit({ 
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP"
  }));
}