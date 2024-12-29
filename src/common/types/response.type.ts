export class ResponseBody {
  body: {
    status: string;
    message: string;
    data: any;
  };
}

export class ResponseData<T = {}> {
  message: string;
  data: T;
}
