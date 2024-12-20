export const HTTP_STATUS = {
  200: 'OK',
  OK: 200,

  201: 'Created',
  CREATED: 201,

  202: 'Accepted',
  ACCEPTED: 202,

  204: 'No Content',
  NO_CONTENT: 204,

  400: 'Bad Request',
  BAD_REQUEST: 400,

  401: 'Unauthorized',
  UNAUTHORIZED: 401,

  403: 'Forbidden',
  FORBIDDEN: 403,

  404: 'Not Found',
  NOT_FOUND: 404,

  415: 'Unsupported Media Type',
  UNSUPPORTED_MEDIA_TYPE: 415,

  500: 'Internal Server Error',
  INTERNAL_SERVER_ERROR: 500,
};

export const enum ERROR_MESSAGE {
  ACCOUNT_NOT_FOUND = '계정을 찾을 수 없습니다.',
  NOT_VALID_REQUEST = '유효한 요청이 아닙니다.',
  FORBIDDEN = '요청 권한이 없습니다.',
  ACCOUNT_ALREADY_EXIST = '계정이 이미 존재합니다.',
  VERIFICATION_CODE_NOT_MATCH = '인증코드가 일치하지 않습니다.',
  EMAIL_PASSWORD_NOT_MATCH = '이메일 또는 패스워드가 일치하지 않습니다.',
}

export const enum SUCCESS_MESSAGE {
  SIGN_UP = '회원 가입이 성공적으로 완료 되었습니다.',
  FIND = `성공적으로 조회 되었습니다.`,
  REQUEST = '요청이 성공적으로 완료 되었습니다.',
}

export const enum ENV_KEYS {
  APP_PORT = 'APP_PORT',
  APP_ENV = 'APP_ENV',
  DATABASE_MYSQL_HOST = 'DATABASE_MYSQL_HOST',
  DATABASE_MYSQL_USERNAME = 'DATABASE_MYSQL_USERNAME',
  DATABASE_MYSQL_PASSWORD = 'DATABASE_MYSQL_PASSWORD',
  DATABASE_MYSQL_NAME = 'DATABASE_MYSQL_NAME',
  DATABASE_MYSQL_PORT = 'DATABASE_MYSQL_PORT',
}

export const CUSTOM_REPOSITORY = 'CUSTOM_REPOSITORY';

export const MYSQL_MIGRATION_PATH = 'dist/migrations/*.js';

export enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ROLE_TYPE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum LOGIN_METHOD_TYPE {
  BASIC = 'BASIC',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO',
}

export enum PET_SIZE_TYPE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

// 추가 해야 함
export enum BOARD_CATEGORY_TYPE {
  PROUD_PETS = 'PROUD_PETS',
  CONSULTATION = 'CONSULTATION',
  PROTECT = 'PROTECT',
  LIFE = 'LIFE',
}

export enum NOTIFICATION_TYPE {
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  INVITE = 'INVITE',
}
