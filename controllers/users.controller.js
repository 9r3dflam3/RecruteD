import { UsersService } from "../services/users.service";

export class UsersController {
  usersService = new UsersService();
  //회원가입 api
  getMyInfo = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const getMyInfo = await this.usersService.getMyInfo(userId);
      const myInfo = await this.usersService.getMyInfo();
      return res.status(200).json({ data: myInfo });
    } catch (err) {
      next(err);
    }
  };

  usersSignUp = async (req, res, next) => {
    try {
      const { email, name, password, passwordConfirm } = req.body;

      const usersSignUp = await this.usersService.userSignUp(
        email,
        name,
        password,
        passwordConfirm
      );

      return res
        .status(201)

        .json({ status: 201, message: "회원가입 성공!", usersSignUp: resUser });

    } catch (err) {
      next(err);
    }
  };

  usersLogIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const usersLogIn = await this.usersService.userLogIn(email, password);

      return res
        .status(200)
        .json({ status: 200, message: "로그인 성공!", accessToken });
    } catch (err) {
      next(err);
    }
  };
}
