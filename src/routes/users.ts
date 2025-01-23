import { Router } from "express";
import UserController from "../controllers/users.js";
import { jwtAuth } from "../middlewares/jwt_auth.js";
import { AuthorizeRole } from "../middlewares/authorize_role.js";
import { UserRoles } from "../config/constants.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/request-password-reset", UserController.requestPasswordReset);
router.post("/reset-password", UserController.resetPassword);

router.get(
  "protected-content",
  jwtAuth,
  AuthorizeRole([UserRoles.ADMIN, UserRoles.USER]),
  UserController.protectedContent
);

export default router;
