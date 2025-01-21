import { hashPassword, verifyPassword } from "../utils/crypto.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { UserModel } from "../models/User.js";
import { User } from '../entities/User.js';
import { ServiceResponse } from "../interfaces/common.js";
import { getErrorMessage } from "../utils/error_handler.js";
import { JwtPayload } from "jsonwebtoken";

export class UserService {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public async registerUser(name: string, email: string, password: string): Promise<ServiceResponse> {
        try {
            const userObj = new User();
            userObj.name = name;
            userObj.email = email;
            userObj.password = await hashPassword(password);

            const user = await this.userModel.getUserByEmail(email);
            if(user) {
                return {
                    "status": false,
                    "message": "user is already available!"
                };
            }

            const userId = await this.userModel.createUser(userObj);
            if(!userId) {
                return {
                    "status": false,
                    "message": "user is not created!"
                };
            }

            return {
                "status": true,
                "userId": userId
            };
        } catch(err) {
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during user registration.")
            };
        }
    }

    public async authenticateUser(email: string, password: string, rememberMe: boolean): Promise<ServiceResponse> {

        try {

            const user = await this.userModel.getUserByEmail(email);
            if(!user) {
                return {
                    "status": false,
                    "message": "user is not available!"
                };
            }

            const verify = await verifyPassword(password, user.password);
            if(!verify) {
                return {
                    "status": false,
                    "message": "Invalid user credential!"
                };
            }

            const token = await generateToken({
                id: user.id
            });

            let refreshToken: string | undefined;
            if (rememberMe) {
                refreshToken = await generateToken({ id: user.id }, null, { expiresIn: '30d'}); // Long-lived
                await this.userModel.storeRefreshToken(user.id, refreshToken); // Store refresh token
            }

            return {
                "status": true,
                "token": token,
                refreshToken 
            };
        } catch(err) {
            console.log("UserService", "authenticateUser", err);
            return {
                status: false,
                message: getErrorMessage(err, "An error occurred during authenticate user")
            };
        }
    }

    public async refreshAccessToken(refreshToken: string): Promise<ServiceResponse> {
        try {
            const payload = await verifyToken(refreshToken) as JwtPayload; // Decode and verify refresh token
            const user = await this.userModel.getUserById(payload.id);
    
            if (!user) {
                return {
                    status: false,
                    message: "User not found!"
                };
            }
    
            const isValid = await this.userModel.validateRefreshToken(user.id, refreshToken);
            if (!isValid) {
                return {
                    status: false,
                    message: "Invalid or expired refresh token!"
                };
            }
    
            // Generate new access token
            const newAccessToken = await generateToken({ id: user.id }, null, { expiresIn: '15m'});
            return {
                status: true,
                token: newAccessToken
            };
        } catch (err) {
            return {
                status: false,
                message: getErrorMessage(err, "Failed to refresh access token.")
            };
        }
    }
    
    public async requestPasswordReset(email: string): Promise<ServiceResponse> {
        try {
            const user = await this.userModel.getUserByEmail(email);
            if (!user) {
                return {
                    status: false,
                    message: "User not found!"
                };
            }

            const resetToken = await generateToken({ id: user.id }, null, { expiresIn: "10m" });
            await this.userModel.storeResetToken(user.id, resetToken); // Store reset token

            // Send email
            // sendPasswordResetEmail(email, resetToken);

            return {
                status: true,
                message: "Password reset link has been sent to your email."
            };
        } catch (err) {
            return {
                status: false,
                message: getErrorMessage(err, "Failed to request password reset.")
            };
        }
    }
    public async resetPassword(token: string, newPassword: string): Promise<ServiceResponse> {
        try {
            const payload = await verifyToken(token) as JwtPayload; // Decode and verify reset token
            const user = await this.userModel.getUserById(payload.id);
    
            if (!user) {
                return {
                    status: false,
                    message: "Invalid or expired token!"
                };
            }
    
            const hashedPassword = await hashPassword(newPassword);
            await this.userModel.updatePassword(user.id, hashedPassword); // Update password
    
            return {
                status: true,
                message: "Password has been reset successfully."
            };
        } catch (err) {
            return {
                status: false,
                message: getErrorMessage(err, "Failed to reset password.")
            };
        }
    }
    


}