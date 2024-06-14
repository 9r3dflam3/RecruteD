export const MESSAGE = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: "이메일이 누락되었습니다. 다시 한 번 입력해주세요.",
        DUPLICATED: "이미 가입된 사용자입니다.",
      },
      PASSWORD: {
        REQUIRED: "비밀번호가 누락되었습니다. 다시 한 번 입력해주세요.",
        MIN_LENGTH: "비밀번호는 6자리 이상이어야 합니다.",
      },
      PASSWORD_CONFIRM: {
        REQUIRED: "비밀번호 확인은 필수입니다.",
        UNMATCHED_PASSWORD:
          "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.",
      },
      NAME: {
        REQUIRED: "이름이 누락되었습니다. 다시 한 번 입력해주세요.",
      },
      UNAUTHORIZED: "인증 정보가 유효하지 않습니다.",
      JWT: {
        NO_TOKEN: "인증 정보가 없습니다.",
        NOT_SUPPORTED_TYPE: "지원하지 않는 인증 방식입니다.",
        EXPIRED: "인증 정보가 만료되었습니다.",
        NO_USER: "인증 정보와 일치하는 사용자가 없습니다.",
        INVALID: "인증 정보가 유효하지 않습니다.",
      },
    },
    SIGN_UP: {
      SUCCEED: "회원가입 성공!",
    },
    SIGN_IN: {
      SUCCEED: "로그인 성공!",
    },
  },
  USERS: {
    GET_MY_INFO: {
      SUCCEED: "내 정보 조회 성공!",
    },
  },
  RESUMES: {
    COMMON: {
      TITLE: {
        REQUIRED: "제목을 입력해주세요.",
      },
      CONTENT: {
        REQUIRED: "자기소개를 입력해주세요.",
        MIN_LENGTH: "자기소개는 150자 이상 작성해야 합니다.",
      },
      NOT_FOUND: "이력서가 존재하지 않습니다.",
      NO_ACCESS_RIGTH: "접근 권한이 없습니다.",
    },
    CREATE: {
      SUCCEED: "이력서 생성 성공!",
    },
    GET_LIST: {
      SUCCEED: "이력서 목록 조회 성공!",
    },
    GET_DETAIL: {
      SUCCEED: "이력서 상세 조회 성공!",
    },
    UPDATE: {
      SUCCEED: "이력서 수정 성공!",
      NO_BODY_DATA: "수정할 정보를 입력해주세요.",
      MIN_LENGTH: "자기소개는 150자 이상 작성해야 합니다.",
    },
    DELETE: {
      SUCCEED: "이력서 삭제 성공!",
    },
  },
};
