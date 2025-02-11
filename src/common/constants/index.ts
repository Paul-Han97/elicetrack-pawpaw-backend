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
  NICKNAME_ALREADY_EXIST = '이미 사용 중인 닉네임입니다.',
  VERIFICATION_CODE_NOT_MATCH = '인증코드가 일치하지 않습니다.',
  EMAIL_PASSWORD_NOT_MATCH = '이메일 또는 패스워드가 일치하지 않습니다.',
  UNAUTHORIZED = '로그인이 필요 합니다.',
  NOT_FOUND = '해당하는 리소스를 찾을 수 없습니다.',
  FAILED_SEND_EMAIL = '이메일 전송이 실패 했습니다.',
}

export const enum SUCCESS_MESSAGE {
  SIGN_UP = '회원 가입이 성공적으로 완료 되었습니다.',
  FIND = `성공적으로 조회 되었습니다.`,
  REQUEST = '요청이 성공적으로 완료 되었습니다.',

  ROOM_ALREADY_EXIST = '이미 연결된 사용자 입니다.',
  CREATED_CHAT_ROOM = '채팅방이 생성 되었습니다.',
  NOTIFICATION_ARRIVED = '알림을 수신 했습니다.',
  JOINED_ROOM = '채팅방에 입장 되었습니다.',
  SENT_MESSAGE = '메세지를 전송 했습니다.',
}

export const enum ENV_KEYS {
  APP_PORT = 'APP_PORT',
  APP_ENV = 'APP_ENV',
  DATABASE_MYSQL_HOST = 'DATABASE_MYSQL_HOST',
  DATABASE_MYSQL_USERNAME = 'DATABASE_MYSQL_USERNAME',
  DATABASE_MYSQL_PASSWORD = 'DATABASE_MYSQL_PASSWORD',
  DATABASE_MYSQL_NAME = 'DATABASE_MYSQL_NAME',
  DATABASE_MYSQL_PORT = 'DATABASE_MYSQL_PORT',
  SESSION_SECRET = 'SESSION_SECRET',
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PREFIX = 'REDIS_PREFIX',
  DATABASE_MONGO_URI = "DATABASE_MONGO_URI",
  PUBLIC_PET_API_KEY = 'PUBLIC_PET_API_KEY',
  PUBLIC_PET_API_END_POINT = 'PUBLIC_PET_API_END_POINT',
  AWS_REGION = 'AWS_REGION',
  AWS_S3_ACCESS = 'AWS_S3_ACCESS',
  AWS_S3_SECRET = 'AWS_S3_SECRET',
  AWS_S3_BUCKET_NAME = 'AWS_S3_BUCKET_NAME',
  EMAIL_HOST = 'EMAIL_HOST',
  EMAIL_PORT = 'EMAIL_PORT',
  EMAIL_USERNAME = 'EMAIL_USERNAME',
  EMAIL_PASSWORD = 'EMAIL_PASSWORD',
  PASSWORD_STRING = 'PASSWORD_STRING',
  PASSWORD_SPECIAL = 'PASSWORD_SPECIAL',
  OAUTH_KAKAO_RESTAPI_KEY = 'OAUTH_KAKAO_RESTAPI_KEY',
  OAUTH_KAKAO_AUTHORIZE = 'OAUTH_KAKAO_AUTHORIZE',
  OAUTH_KAKAO_TOKEN = 'OAUTH_KAKAO_TOKEN',
  OAUTH_KAKAO_LOGIN_REDIRECT = 'OAUTH_KAKAO_LOGIN_REDIRECT',
  OAUTH_KAKAO_USER_ME = 'OAUTH_KAKAO_USER_ME',
}

export const enum SOCKET_KEYS {
  NAMESPACE = 'chats',

  SEND_MESSAGE = 'send-message',
  SEND_MESSAGE_RESPONSE = 'send-message-response',

  RECEIVE_MESSAGE = 'receive-message',
  RECEIVE_MESSAGE_RESPONSE = 'receive-message-response',

  CREATE_ROOM = 'create-room',
  CREATE_ROOM_ERROR = 'create-room-error',
  CREATE_ROOM_RESPONSE = 'create-room-response',

  JOIN = 'join',
  JOIN_RESPONSE = 'join-response',

  JOIN_ROOM_LIST = 'join-room-list',
  JOIN_ROOM_LIST_RESPONSE = 'join-room-list-response',

  NOTIFICATION = 'notification',
  NOTIFICATION_RESPONSE = 'notification-response',

  GET_MESSAGE_LIST = 'get-message-list',
  GET_MESSAGE_LIST_RESPONSE = 'get-message-list-response',

  GET_ROOM_LIST = 'get-room-list',
  GET_ROOM_LIST_RESPONSE = 'get-room-list-response',
}

export const LOGIN_COOKIE = 'connect.sid';

export const LOGIN_COOKIE_HEADER = 's%3A';

export const PLACE_API = 'PLACE_API';

export const EMAIL_TEMPLATE_OPENER = `<div style="margin: 0 auto; width: 200px; height: 300px;">
        <span style="display: block; text-align:center;">포포</span>
        <span style="display: block; text-align:center;">인증코드</span>
        <span style="display: block; text-align:center; margin-top: 10px; font-size: larger; font-weight: bold; letter-spacing: 5px;">`;

export const EMAIL_TEMPLATE_CLOSER = `</span></div>`;

export const CUSTOM_REPOSITORY = 'CUSTOM_REPOSITORY';

export const MYSQL_MIGRATION_PATH = 'dist/migrations/*.js';

export enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum GENDER_TYPE_INDEX {
  MALE = 1,
  FEMALE,
}

export enum ROLE_TYPE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ROLE_TYPE_INDEX {
  USER = 1,
  ADMIN,
}

export enum LOGIN_METHOD_TYPE {
  BASIC = 'BASIC',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO',
}

export enum LOGIN_METHOD_TYPE_INDEX {
  BASIC = 1,
  GOOGLE,
  KAKAO,
}

export enum PET_SIZE_TYPE {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum PET_SIZE_TYPE_INDEX {
  SMALL = 1,
  MEDIUM,
  LARGE,
}

export enum BOARD_CATEGORY_TYPE {
  PROUD_PETS = 'PROUD_PETS',
  CONSULTATION = 'CONSULTATION',
  PROTECT = 'PROTECT',
  LIFE = 'LIFE',
}

export enum BOARD_CATEGORY_TYPE_INDEX {
  PROUD_PETS = 1,
  CONSULTATION,
  PROTECT,
  LIFE,
}

export enum NOTIFICATION_TYPE {
  RECEIVE_MESSAGE = 'RECEIVE_MESSAGE',
  INVITE = 'INVITE',
}

export enum NOTIFICATION_TYPE_INDEX {
  RECEIVE_MESSAGE = 1,
  INVITE,
}

export enum PLACE_CATEGORY_TYPE {
  ANIMAL_PHARMACY = 'ANIMAL_PHARMACY',
  CAFE = 'CAFE',
  ANIMAL = 'ANIMAL',
  PET_SUPPLIES = 'PET_SUPPLIES',
  BEAUTY = 'BEAUTY',
  CULTURAL_CENTER = 'CULTURAL_CENTER',
  GUESTHOUSE = 'GUESTHOUSE',
  RESTAURANT = 'RESTAURANT',
  TOURIST_ATTRACTION = 'TOURIST_ATTRACTION',
  PET_BOARDING = 'PET_BOARDING',
  MUSEUM = 'MUSEUM',
  ART_GALLERY = 'ART_GALLERY',
  HOTEL = 'HOTEL',
}

export enum PLACE_CATEGORY_KOR_TYPE {
  ANIMAL_PHARMACY = '동물약국',
  CAFE = '카페',
  ANIMAL = '동물병원',
  PET_SUPPLIES = '반려동물용품',
  BEAUTY = '미용',
  CULTURAL_CENTER = '문예회관',
  GUESTHOUSE = '펜션',
  RESTAURANT = '식당',
  TOURIST_ATTRACTION = '여행지',
  PET_BOARDING = '위탁관리',
  MUSEUM = '박물관',
  ART_GALLERY = '미술관',
  HOTEL = '호텔',
}
