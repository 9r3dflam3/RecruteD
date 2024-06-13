import { UsersRepository } from "../repositories/users.repository";

export class UsersService {
  usersRepository = new UsersRepository();

  getMyInfo = async (userId) => {
    const myInfo = await this.usersRepository.findUser(userId);

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

  userSignUp = async (email, name, password, passwordConfirm) => {
    const userSignUp = await this.usersRepository.userSignUp;
  };

  userLogIn;
}
