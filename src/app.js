import dotenv, { config } from "dotenv";
import usersRouter from "./router/users.router.js";
import resumeRouter from "./router/resume.router.js";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(`/users`, [usersRouter]);
app.use("/resumes", [resumeRouter]);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} 번으로 포트가 열렸습니다.`);
});
