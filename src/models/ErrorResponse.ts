import { BaseResponse } from './BaseResponse';

export class ErrorResponse extends BaseResponse {
  constructor(public message: string) {
    super();
    this.message = message;
    this.statusCode = 400;
  }
}
