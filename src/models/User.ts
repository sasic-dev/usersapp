import { DataSource } from "typeorm";
import { Database } from "../config/database.js";
import { User } from "../entities/User.js";
import { UserRefreshToken } from "../entities/UserRefreshToken.js";
import { addDaysToCurrentDate } from "../utils/common.js";

export class UserModel {
    private datasource: DataSource = Database.getInstance().dataSource;

    /**
     * Create a new user in the database.
     * @param user - The user entity to be created.
     * @returns The ID of the created user or null in case of failure.
     */
    async createUser(user: User): Promise<number | null> {
        try {
            const result = await this.datasource.getRepository(User)
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(user)
                .execute();

            return result.identifiers[0]?.id ?? null;
        } catch (err) {
            console.error("Error creating user:", err);
            return null;
        }
    }

    /**
     * Retrieve a user by their email.
     * @param email - The email of the user to retrieve.
     * @returns The user entity or null if not found.
     */
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await this.datasource.getRepository(User)
                .createQueryBuilder("user")
                .select([
                    "user.id",
                    "user.name",
                    "user.email",
                    "user.password",
                    "user.createdAt",
                    "user.updatedAt",
                ])
                .where("user.email = :email", { email })
                .getOne();
        } catch (err) {
            console.error("Error fetching user by email:", err);
            return null;
        }
    }

    /**
     * Retrieve a user by their ID.
     * @param id - The ID of the user to retrieve.
     * @returns The user entity or null if not found.
     */
    async getUserById(id: number): Promise<User | null> {
        try {
            return await this.datasource.getRepository(User)
                .createQueryBuilder("user")
                .select([
                    "user.id",
                    "user.name",
                    "user.email",
                    "user.role",
                    "user.password",
                    "user.createdAt",
                    "user.updatedAt",
                ])
                .where("user.id = :id", { id })
                .getOne();
        } catch (err) {
            console.error("Error fetching user by ID:", err);
            return null;
        }
    }

    /**
     * Store or update a reset token for a specific user.
     * @param userId - The ID of the user.
     * @param token - The reset token to store.
     */
    async storeResetToken(userId: number, token: string): Promise<boolean> {
        try {
            const repository = this.datasource.getRepository(User);

            // Check if the user exists
            const user = await repository.findOneBy({ id: userId });
            if (!user) {
                console.warn(`User with ID ${userId} not found.`);
                return false;
            }

            // Update the reset token
            await repository.update(userId, { resetToken: token });
            return true;
        } catch (err) {
            console.error("Error storing reset token:", err);
            return false;
        }
    }

    /**
     * Clear the reset token for a specific user.
     * @param userId - The ID of the user.
     */
    async clearResetToken(userId: number): Promise<boolean> {
        try {
            const repository = this.datasource.getRepository(User);

            // Check if the user exists
            const user = await repository.findOneBy({ id: userId });
            if (!user) {
                console.warn(`User with ID ${userId} not found.`);
                return false;
            }

            // Clear the reset token
            await repository.update(userId, { resetToken: null });
            return true;
        } catch (err) {
            console.error("Error clearing reset token:", err);
            return false;
        }
    }

    /**
     * Validates a refresh token.
     * @param refreshToken - The refresh token to validate.
     * @returns The user ID if the token is valid, or null if not.
     */
    async validateRefreshToken(userId: number, token: string): Promise<number | null> {
        try {
            const repository = this.datasource.getRepository(UserRefreshToken);

            // Retrieve the user with the given refresh token
            const user = await repository.findOneBy({ id: userId, token: token });
            if (!user) {
                console.warn(`User with reset token ${token} not found.`);
                return null;
            }

            // Remove the reset token
            await repository.update(user.id, { isRevoked: true });
            return user.id;
        } catch (err) {
            console.error("Error validating reset token:", err);
            return null;
        }
    }

    async updatePassword(userId: number, hashedPassword: string) {
        try {
            const repository = this.datasource.getRepository(User);

            await repository.update(userId, {
                password: hashedPassword,
                resetToken: null
            });

            return userId;
        } catch(err) {
            return null;
        }
    }

    async storeRefreshToken(userId: number, token: string) {
        try {
            const tokenRepository = this.datasource.getRepository(UserRefreshToken);

            await tokenRepository.insert({
                userId,
                token,
                expiresAt: addDaysToCurrentDate(30)
            })
        } catch(err) {
            return null;
        }
    }
}
