import { Prisma } from "@prisma/client";

export class ResumeRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createResume = async (resumeId, title, comment) => {
    const createResume = await this.prisma.resume.create({
      data: { resumeId, title, comment },
    });
    return createResume;
  };

  findAllResumes = async (userId, queryStatus, querySort) => {
    const resumes = await this.prisma.resume.findMany({
      where: {
        userId,
        queryStatus,
      },
      orderBy: {
        createAt: querySort,
      },
      include: {
        user: true,
      },
    });
    return resumes;
  };

  updateResume = async (resumeId, title, comment) => {
    const updateResume = await this.prisma.resume.update({
      where: { id: +resumeId },
      data: { title, comment },
    });
    return updateResume;
  };

  deleteResume = async (resumeId) => {
    await this.prisma.resume.delete({ where: { id: +resumeId } });
  };
}
