import jwt, { Algorithm, SignOptions, JwtPayload } from "jsonwebtoken";

const defaultSecretKey: string = "Q0zJ9L4m8kW2eN1T7rR5dO6xC3VbYpFzA8sKxU0nP7g";
const defaultOptions = {
    algorithm: "HS256" as Algorithm,
    issuer: "taskapp-restapi",
}

export async function generateToken(payload: JwtPayload, secretKey: string | null = null, options: SignOptions = {}): Promise<string> {
    const newSecretKey = secretKey ?? defaultSecretKey;
    
    const newOptions: SignOptions = {
        ...defaultOptions,
        ...options
    }
   console.log(payload);
    return jwt.sign(payload, newSecretKey, newOptions);
}

export async function verifyToken(token: string, secretKey: string | null = null, options: SignOptions = {}): Promise<JwtPayload | string> {
    const newSecretKey = secretKey ?? defaultSecretKey;
    const newOptions: SignOptions = {
        ...defaultOptions,
        ...options
    }

    return jwt.verify(token, newSecretKey, newOptions);
}