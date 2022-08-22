import { Inject, CACHE_MANAGER, Injectable } from '@nestjs/common';
import Cache from 'cache-manager';

import { Result } from '../../models/Result';
import axios from 'axios';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { GIST_OF_USER } from 'src/utils/Constants';

@Injectable()
export class GistService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getGistByUsername(username: string): Promise<Result> {
    const prev = await this.cacheManager.get(username);
    if (prev) {
      return Result.success(prev);
    }
    try {
      const gist = await axios.get(`${GIST_OF_USER}${username}/gists`);
      await this.cacheManager.set(username, gist.data);
      return Result.success(gist.data);
    } catch (e) {
      throw new ErrorResponse(e.message);
    }
  }
}
