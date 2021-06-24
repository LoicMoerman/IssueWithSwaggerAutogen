import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", UserController.createOne);

userRouter.get("/", UserController.getAll);

userRouter.get("/:id", UserController.getOne);

userRouter.patch("/", UserController.updateOne);

userRouter.delete("/:id", UserController.deleteOne);

export default userRouter;
