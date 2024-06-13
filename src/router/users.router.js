import express from "express";
import { prisma } from "../utils/prisma.util.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
import { UsersController } from "../../controllers/users.controller.js";

dotenv.config();

const router = express.Router();

const usersController = UsersController;

//회원가입
router.post("/user/sign-up", usersController.userSignUp);

//액세스토큰 발급(24시간)
function createAccessToken(userId) {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
}

//로그인
router.post("/user/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "인증 정보가 유효하지 않습니다." });
    }

    const decodePassword = await bcrypt.compare(password, user.password);
    if (!decodePassword) {
      return res
        .status(401)
        .json({ status: 401, message: "인증 정보가 유효하지 않습니다." });
    }

    const accessToken = createAccessToken(user.userId);

    return res
      .status(200)
      .json({ status: 200, message: "로그인 성공!", accessToken });
  } catch (err) {
    next(err);
  }
});

router.get("/user", authMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await prisma.users.findFirst({
      where: { userId },
      select: {
        userId: true,
        email: true,
        name: true,
        role: true,
        createAt: true,
        updateAt: true,
      },
    });

    return res
      .status(200)
      .json({ message: "내 정보 조회에 성공했습니다", user });
  } catch (err) {
    next(err);
  }
});

export default router;
