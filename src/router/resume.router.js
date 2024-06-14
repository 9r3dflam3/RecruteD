import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { ResumeController } from "../controllers/resumes.controller.js";

const resumeRouter = express.Router();
const resumeController = new ResumeController();

//이력서 생성
resumeRouter.post(
  "/resumes/create",
  authMiddleware,
  resumeController.createResume
);

//이력서 목록 조회 api
resumeRouter.get("/resumes", resumeController.getResumeList);

//이력서 상세 조회 api
resumeRouter.get("/resumes/:resumeId", resumeController.getResumeById);

//이력서 수정 api
resumeRouter.patch(
  "/resumes/:resumeId",
  authMiddleware,
  resumeController.updateResume
);

//이력서 삭제 api
resumeRouter.delete(
  "/resumes/:resumeId",
  authMiddleware,
  resumeController.deleteResume
);

export default resumeRouter;
