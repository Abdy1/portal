export class ResponseDTO<T> {
    results: T[];
    result: T;
    message: string;
    status: boolean;
  }  