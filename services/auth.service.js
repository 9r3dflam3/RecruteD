import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  authRepository = new AuthRepository();

  //중복 가입 유저 확인
  isExistUser = async (email) => {
    const isExistUser = await prisma.user.findFirst({
      where: { email },
    });
    return isExistUser;
  };

  // 회원가입
  userSignUp = async (email, name, password, passwordConfirm) => {
    const userSignUp = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return userSignUp;
  };
}
