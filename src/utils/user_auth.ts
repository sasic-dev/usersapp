
import { UserModel } from "../models/User.js";

/**
 * @class UserAuth
 * @classdesc Handles user authentication logic
 */
export class UserAuth {

    /**
     * @property {number} userId
     */
    private static userId: number = 0;

    /**
     * Get the user id
     * 
     * This function return the user ID, if the user is validated
     * Otherwise returns 0.
     * 
     * @method getId
     * @returns Promise<number>
     */
    static async getId(): Promise<number> {
        return UserAuth.userId || 0;
    }

    /**
     * Validates the user by their id
     * 
     * This function sets the user ID, fetches the user from the database, and returns the user ID
     * if the user exists. If the user does not exist, it returns 0.
     * 
     * @method validate
     * @param {number} uid
     * @returns Promise<number>
     */
    static async validate(uid: number): Promise<number> {
        try {
            UserAuth.userId = uid;
        
            const userModel = new UserModel();
            const user = await userModel.getUserById(uid)
            return user ? uid : 0;
        } catch(err) {
            return 0;
        }
        
    }


}