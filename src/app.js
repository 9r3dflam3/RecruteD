import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
import UsersRouter from "./router/users.router.js";
import express from "express";

dotenv.config();

const app = express();

const token = jwt.sign({ myPayloadData: 1234 }, "mysecretkey");
console.log(token);

app.use(express.json());
app.use(`/`, [UsersRouter]);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 번으로 포트가 열렸습니다.`);
});
