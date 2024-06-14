import { ResumeRepository } from "../repositories/resumes.repository";
import { MESSAGE } from "../constants/message.constant";

export class ResumeService {
  resumeRepository = new ResumeRepository();

  createResume = async (userId, title, comment) => {
    const createResume = await this.resumeRepository.createResume(
      userId,
      title,
      comment
    );
    return createResume;
  };

  getResumeList = async (sort) => {
    const querySort = sort && sort.toLowerCase() === "asc" ? "asc" : "desc";

    const resumes = await this.resumeRepository.findAllResumes(
      userId,
      queryStatus,
      querySort
    );
    return resumes;
  };

  updateResume = async (userId, resumeId, title, comment) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);
    if (!resume) {
      throw new Error(MESSAGE.RESUMES.COMMON.NOT_FOUND);
    }

    if (userId !== resume.userId) {
      throw new Error(MESSAGE.RESUMES.COMMON.NO_ACCESS_RIGTH);
    }

    const updateResume = await this.resumeRepository.updateResume(
      resumeId,
      title,
      comment
    );
    return updateResume;
  };

  deleteResume = async (userId, resumeId) => {
    const resume = await this.resumeRepository.findResumeById(resumeId);

    if (!resume) {
      throw new Error(MESSAGE.RESUMES.COMMON.NOT_FOUND);
    }
    if (userId !== resume.userId) {
      throw new Error(MESSAGE.RESUMES.COMMON.NO_ACCESS_RIGTH);
    }

    await this.resumeRepository.deleteResume(resumeId);
  };
}
