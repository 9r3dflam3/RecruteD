import express from "express";
import { UsersController } from "../controllers/users.controller.js";

const userRouter = express.Router();

const usersController = UsersController;

//회원가입
userRouter.post("/users/sign-up", usersController.usersSignUp);

//로그인
userRouter.post("/users/login", usersController.usersLogIn);

userRouter.get("/user", usersController.getMyInto);

export default userRouter;
