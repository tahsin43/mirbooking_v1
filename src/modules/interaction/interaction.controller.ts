import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Query,
  Delete,
} from '@nestjs/common';

import { GetQueryDto } from '../../dto/getQueryDto';
import { InteractionService } from './interaction.service';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Interactions');
@Controller('interactions')
export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  @Get()
  async getInteractions(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    const storages: any = await this.interactionService.getInteractions(
      getQueryDto,
    );
    return res.status(HttpStatus.OK).send(storages);
  }

  @Get(':id')
  async getInteractionById(@Param('id') id: any, @Res() res: any) {
    const action: any = await this.interactionService.getInteractionById(id);
    return res.status(HttpStatus.OK).send(action);
  }

  @Get('read/:id')
  async getInteractionByRead(@Param('id') read: any, @Res() res: any) {
    const interactions: any =
      await this.interactionService.getInteractionByRead(read);
    return res.status(HttpStatus.OK).send(interactions);
  }

  @Get('guide/:id')
  async getInteractionByGuide(@Param('id') guide: any, @Res() res: any) {
    const interactions: any =
      await this.interactionService.getInteractionByGuide(guide);
    return res.status(HttpStatus.OK).send(interactions);
  }

  @Post()
  async create(
    @Body() body: { guide: string; target: string },
    @Res() res: any,
  ) {
    const result = await this.interactionService.createInteraction(
      body.guide,
      body.target,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  async deleteInteraction(@Param('id') id: any) {
    return this.interactionService.deleteInteraction(id);
  }
}
