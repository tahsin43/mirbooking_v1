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
} from '@nestjs/common';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateKmerDto } from './dto/createKmer.dto';
import { UpdateKmerDto } from './dto/updateKmer.dto';
import { KmerService } from './kmer.service';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Kmers');
@Controller('kmers')
export class KmerController {
  constructor(private kmerService: KmerService) {}

  @Get()
  async getkmers(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    const kmers: any = await this.kmerService.getKmers(getQueryDto);
    return res.status(HttpStatus.OK).send(kmers);
  }

  @Get(':id')
  async getKmerByIdOrRead(@Param('id') id: any, @Res() res: any) {
    const kmer: any = await this.kmerService.getKmerById(id);
    return res.status(HttpStatus.OK).send(kmer);
  }

  @Get('read/:kmerRead')
  async getKmerByKmer(@Param('kmerRead') kmerRead: any, @Res() res: any) {
    const kmer: any = await this.kmerService.getKmerByKmerRead(kmerRead);
    return res.status(HttpStatus.OK).send(kmer);
  }

  @Post()
  async create(@Body() createKmerDto: CreateKmerDto, @Res() res: any) {
    const kmer: any = await this.kmerService.createKmer(createKmerDto);
    return res.status(HttpStatus.OK).send(kmer);
  }

  @Put(':id')
  async updateKmer(
    @Param('id') id: any,
    @Body() updateKmerDto: UpdateKmerDto,
    @Res() res: any,
  ) {
    const kmer: any = await this.kmerService.updateKmer(id, updateKmerDto);
    return res.status(HttpStatus.OK).send(kmer);
  }

  @Delete(':id')
  async delete(@Param('id') id: any, @Res() res: any) {
    const response: any = await this.kmerService.deleteKmer(id);
    return res.status(HttpStatus.OK).send(response);
  }
}
