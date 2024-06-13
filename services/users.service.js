import { AuthRepository } from "../repositories/auth.repository";
import { HTTP_STATUS } from "../src/constants/http-status.constant";
import { MESSAGE } from "../src/constants/message.constant";

export class UsersService {
  authRepository = new AuthRepository();
  //사용자 정보 조회
  getMyInfo = async (userId) => {
    const myInfo = await this.usersRepository.getMyInfoById(userId);

    myInfo.map((myInfo) => {
      return {
        where: { userId },
        select: {
          id: myInfo.id,
          email: myInfo.email,
          name: myInfo.name,
          role: myInfo.role,
          createAt: myInfo.createAt,
          updateAt: myInfo.createAt,
        },
      };
    });
  };

  // 회원가입
  userSignUp = async (email, name, password, passwordConfirm) => {
    //중복 확인하여 가입
    const isExistUser = await prisma.user.findFirst({
      where: { email },
    });
    if (isExistUser === true) {
      return {
        status: HTTP_STATUS.OK,
        message: MESSAGE.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    const userSignUp = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return userSignUp;
  };

  //로그인
  userLogIn = async (email, password) => {
    const user = await this.authRepository.findFirst(email);
    const isPasswordMatched = user
      ? await compareWithHashed(password, user.password)
      : null;
    if (!user || !isPasswordMatched)
      throw new HttpError.Unauthorized(MESSAGE.AUTH.COMMON.UNAUTHORIZED);

    const payload = { id: +user.id };
    const accessToken = generateAccessToken(payload);

    return accessToken;
  };
}
