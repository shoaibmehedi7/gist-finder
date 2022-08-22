/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */
export class BaseResponse {
  public status: string = '';
  public statusCode: number = 200;
  public message?: string = '';

  constructor() {}
}
