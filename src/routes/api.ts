import { Router } from "express";
import userRouter from "./users.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "User management api",
  });
});

router.get("/public-content", (req, res) => {
  res.json({ message: "This is public content." });
});

router.use("/users", userRouter);

export default router;
