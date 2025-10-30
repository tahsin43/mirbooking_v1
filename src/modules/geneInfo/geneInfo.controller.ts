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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { GetQueryDto } from '../../dto/getQueryDto';
import { GeneInformationService } from './geneInfo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Gene Informations');
@Controller('gene-informations')
export class GeneInformationController {
  constructor(private geneInfoService: GeneInformationService) {}

  @Get()
  async getGeneInformations(
    @Query() getQueryDto: GetQueryDto,
    @Res() res: any,
  ) {
    const storages: any = await this.geneInfoService.getGeneInformations(
      getQueryDto,
    );
    return res.status(HttpStatus.OK).send(storages);
  }

  @Get(':id')
  async getGeneInformationById(@Param('id') id: any, @Res() res: any) {
    const action: any = await this.geneInfoService.getGeneInformationById(id);
    return res.status(HttpStatus.OK).send(action);
  }

  @Get('transcript/:id')
  async getGeneInformationByTranscript(
    @Param('id') transcript: any,
    @Res() res: any,
  ) {
    const action: any =
      await this.geneInfoService.getGeneInformationByTranscript(transcript);
    return res.status(HttpStatus.OK).send(action);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Res() res: any,
  ) {
    const result = await this.geneInfoService.createGeneInformation(
      file,
      body.type,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Delete(':id')
  async deleteGeneInformation(@Param('id') id: any) {
    return this.geneInfoService.deleteGeneInformation(id);
  }
}
