import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.js";
import { UserAuth } from "../utils/user_auth.js";
import { AppError } from "../utils/error_handler.js";

export const jwtAuth: RequestHandler = async (req, res, next) => {
    try {
        const authorization = req.get("Authorization");
        if (!authorization) {
            return next(new AppError("Authorization header is required", 401));
        }

        const [scheme, token] = authorization.split(" ");
        if (scheme !== "Bearer" || !token) {
            return next(new AppError("Invalid authorization header format", 401));
        }

        // Verify the token and get the payload
        const payload = await verifyToken(token);
        if(typeof payload == "object" && "id" in payload) {
            const userId = await UserAuth.validate(payload.id); // Validates the user by their ID from the payload
            if(!userId) {
                return next(new AppError("User authorization invalid", 400))
            }
        }
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Forward the error to the error-handling middleware
        next(err);
    }
}
