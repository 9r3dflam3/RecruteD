export class AuthRepository {
  //내 정보 조회
  getMyInfo = async (userId) => {
    const user = await prisma.user.findFirst({
      where: { id: +userId },
    });
    return user;
  };
}
