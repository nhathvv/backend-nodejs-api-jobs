import { Router } from "express";
import { registerController } from "~/controllers/users.controller";
import { registerValidator } from "~/middlewares/users.middleware";
const userRouter = Router();

userRouter.post("/register", registerValidator, registerController)

export default userRouter;