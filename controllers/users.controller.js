import { UsersService } from "../services/users.service";
import { HTTP_STATUS } from "../src/constants/http-status.constant";
import { MESSAGE } from "../src/constants/message.constant";

export class UsersController {
  usersService = new UsersService();
  //사용자 정보 조회
  getMyInfo = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const getMyInfo = await this.usersService.getMyInfo(userId);
      return res.status(HTTP_STATUS.OK).json({ data: getMyInfo });
    } catch (err) {
      next(err);
    }
  };

  //회원가입
  usersSignUp = async (req, res, next) => {
    try {
      const { email, name, password, passwordConfirm } = req.body;

      const usersSignUp = await this.usersService.userSignUp(
        email,
        name,
        password,
        passwordConfirm
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGE.AUTH.SIGN_UP.SUCCEED,
        data: usersSignUp,
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  usersLogIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const usersLogIn = await this.usersService.userLogIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGE.AUTH.SIGN_IN.SUCCEED,
        data: usersLogIn,
      });
    } catch (err) {
      next(err);
    }
  };
}
