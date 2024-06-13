import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_SECRET_KEY } from "../constants/env.constant.js";
import { ACCESS_TOKEN_EXPIRES_IN, SALT } from "../constants/auth.constant.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
};

export const hash = async (string) => {
  return await bcrypt.hash(string, SALT);
};

export const compareWithHashed = async (string, hashedString) => {
  return await bcrypt.compare(string, hashedString);
};
