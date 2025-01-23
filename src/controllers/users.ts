import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UserService } from "../services/users.js";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    }).validateAsync(req.body);

    const userService = new UserService();
    const { status, message } = await userService.registerUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
    if (!status) {
      return res.status(203).json({
        message: message ?? "",
      });
    }

    return res.status(200).json({
      message: "User is created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rememberMe: Joi.boolean().default(false),
    }).validateAsync(req.body);

    const userService = new UserService();
    const { status, message, token, refreshToken } =
      await userService.authenticateUser(
        req.body.email,
        req.body.password,
        req.body.rememberMe
      );
    if (!status) {
      return res.status(203).json({
        message: message ?? "",
      });
    }

    return res.status(200).json({
      message: "User Loggedin",
      access_token: token,
      refresh_token: refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Joi.object({
            email: Joi.string().email().required()
        }).validateAsync(req.body);

        const userService = new UserService();
        const { status, message } = await userService.requestPasswordReset(req.body.email);
        return res.status(status ? 200 : 400).json({ message })

    } catch (err) {
        next(err);
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Joi.object({
            token: Joi.string().required(),
            newPassword: Joi.string().required()
        }).validateAsync(req.body);

        const userService = new UserService();
        const { status, message } = await userService.resetPassword(
            req.body.token,
            req.body.newPassword
        );

        return res.status(status ? 200 : 400).json({ message });
    } catch (err) {
        next(err);
    }
}

const protectedContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({ message: "Protected content" });
    } catch (err) {
        next(err);
    }
}

export default {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  protectedContent
};
