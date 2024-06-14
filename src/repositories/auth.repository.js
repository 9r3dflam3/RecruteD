import pkg from "@prisma/client";

const prisma = pkg.Prisma;

export class AuthRepository {
  //내 정보 조회
  getMyInfoById = async (userId) => {
    const user = await prisma.user.findFirst({
      where: { id: +userId },
    });
    return user;
  };
}
