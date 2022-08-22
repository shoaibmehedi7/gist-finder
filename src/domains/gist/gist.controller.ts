import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/models/SuccessResponse';
import { GistService } from './gist.service';

@Controller('gist')
@ApiTags('Gist')
export class GistController {
  constructor(private gistService: GistService) {}

  @Get('getall/:username')
  async getGistByUsername(
    @Res() response,
    @Param('username') username: string,
  ) {
    const result = await this.gistService.getGistByUsername(username);
    response.json(new SuccessResponse(result.getValue()));
  }
}
