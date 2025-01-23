import { Request, Response, NextFunction } from "express";
import { UserAuth } from "../utils/user_auth.js";

export const AuthorizeRole =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userRole = await UserAuth.getRole();
    if (!userRole || !roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions" });
    }
    next();
  };
