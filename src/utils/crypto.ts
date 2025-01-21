import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function generateRandomNumber(min: number, max: number): Promise<number> {
    if(min > max) {
        throw new Error('Min should be less than or equal to max')
    }

    const range = max - min + 1;
    const bytes = crypto.randomBytes(4);
    const randomValue = bytes.readUInt32BE(0) % range;

    return min + randomValue;
}

export async function hashPassword(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}