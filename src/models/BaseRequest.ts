import { IsNotEmpty } from 'class-validator';

export class BaseRequest {
  @IsNotEmpty()
  requesterFirebaseId: string;

  //@IsNotEmpty()
  requesterProfileId: number;

  limit: string;

  pageId: string;
}
