import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.util.js";
import dotEnv from "dotenv";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGE } from "../constants/message.constant.js";

dotEnv.config();

export default async function (req, res, next) {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errorMessage: MESSAGE.JWT.NO_TOKEN });
    }

    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ errorMessage: MESSAGE.JWT.NOT_SUPPORTED_TYPE });
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const userId = decodeToken.userid;

    const user = await prisma.users.findFirst({
      where: { userId: userId },
    });

    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ errorMessage: MESSAGE.AUTH.COMMON.JWT.NO_USER });
    }

    req.user = user;

    next();
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ errorMessage: MESSAGE.AUTH.COMMON.JWT.EXPIRED });
      case "JsonWebTokenError":
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ errorMessage: MESSAGE.AUTH.COMMON.JWT.INVALID });
      default:
        next(error);
    }
  }
}
