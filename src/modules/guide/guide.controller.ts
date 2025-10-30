import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/createGuide.dto';
import { UpdateGuideDto } from './dto/updateGuide.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Guide');
@Controller('guides')
export class GuideController {
  constructor(private guideService: GuideService) {}

  @Get()
  async getGuides(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    const users: any = await this.guideService.getGuides(getQueryDto);
    return res.status(HttpStatus.OK).send(users);
  }

  @Get(':id')
  async getGuideById(@Param('id') id: any, @Res() res: any) {
    const user: any = await this.guideService.getGuideById(id);
    return res.status(HttpStatus.OK).send(user);
  }

  @Get('seq/:guideSeq')
  async getGuideByGuide(@Param('guideSeq') guide: string, @Res() res: any) {
    const user: any = await this.guideService.getGuideByGuide(guide);
    return res.status(HttpStatus.OK).send(user);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Res() res: any) {
    const result = await this.guideService.createGuide(file);
    return res.status(HttpStatus.OK).send(result);
  }

  @Put(':id')
  async update(
    id: MongooseSchema.Types.ObjectId,
    @Body() updateGuideDto: UpdateGuideDto,
  ) {
    return this.guideService.updateGuide(id, updateGuideDto);
  }

  @Delete(':id')
  async delete(id: MongooseSchema.Types.ObjectId) {
    return this.guideService.deleteGuide(id);
  }
}
