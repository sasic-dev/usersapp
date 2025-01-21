import { Request, Response, NextFunction } from "express";

export function appMaintenance(req: Request, res: Response, next: NextFunction) {
        if (process.env.MAINTENANCE_MODE == "on") {
            return res.status(503).json({
                "status": "error",
                "message": "Site under maintenance"
            });
        }
    
        next();
        
}