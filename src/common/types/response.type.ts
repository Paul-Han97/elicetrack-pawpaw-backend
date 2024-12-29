export type ResponseBody = {
  body: {
    status: string;
    message: string;
    data: any;
  };
};

export type ResponseData<T = {}> = {
  message: string;
  data: T;
};
