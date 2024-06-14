import { ResumeService } from "../services/resumes.service.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGE } from "../constants/message.constant.js";

export class ResumeController {
  resumeService = new ResumeService();

  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, comment } = req.body;

      const createResume = await this.resumeService.createResume(
        userId,
        title,
        comment
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGE.RESUMES.CREATE.SUCCEED,
        data: createResume,
      });
    } catch (error) {
      next(error);
    }
  };

  getResumeList = async (req, res, next) => {
    try {
      const userId = req.user;
      let { sort, status } = req.query;

      const resumes = await this.resumeService.getResumeList(
        userId,
        status,
        sort
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGE.RESUMES.GET_LIST.SUCCEED,
        data: resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;

      const resume = await this.resumeService.getResumeById(userId, resumeId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGE.RESUMES.GET_DETAIL.SUCCEED,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const { title, comment } = req.body;

      const updateResume = await this.resumeService.updateResume(
        userId,
        resumeId,
        title,
        comment
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGE.RESUMES.UPDATE.SUCCEED,
        data: updateResume,
      });
    } catch {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;

      await this.resumeService.deleteResume(userId, resumeId);

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: MESSAGE.RESUMES.DELETE.SUCCEED });
    } catch {
      next(error);
    }
  };
}
