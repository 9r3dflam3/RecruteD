import { AuthRepository } from "../repositories/auth.repository.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGE } from "../constants/message.constant.js";
import { generateAccessToken, hash } from "../utils/auth.util.js";

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
  userSignUp = async (email, name, password) => {
    //중복 확인하여 가입
    const isExistUser = await prisma.user.findFirst({
      where: { email },
    });
    if (isExistUser === true) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGE.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }
    //비밀번호 암호화
    const hashedPassword = await hash(password);

    const userSignUp = await prisma.user.create(email, hashedPassword, name);

    return {
      userId: userSignUp.id,
      email: userSignUp.email,
      name: userSignUp.name,
      createAt: userSignUp.createAt,
    };
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
