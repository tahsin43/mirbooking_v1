import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GeneInformationRepository } from 'src/repositories/gene-information.repository';
import { GetQueryDto } from '../../dto/getQueryDto';

import { CreateGeneInformationDto } from './dto/createGeneInfo.dto';
import { KmerService } from '../kmer/kmer.service';

@Injectable()
export class GeneInformationService {
  constructor(
    private readonly geneInfoRepository: GeneInformationRepository,
    private kmerService: KmerService,
  ) {}

  async createGeneInformation(file: Express.Multer.File, type: string) {
    const genInfos: CreateGeneInformationDto[] = [];
    const lines = file.buffer.toString('utf-8');
    let resultLine: Partial<CreateGeneInformationDto> = {};

    for (const line of lines.split('\n')) {
      const strippedLine = line.trim();

      switch (type) {
        case 'ensembl':
          if (this.isTitleSequence(strippedLine)) {
            if (Object.keys(resultLine).length !== 0) {
              await this.geneInfoRepository
                .createGeneInformation(resultLine as CreateGeneInformationDto)
                .then(async (response) => {
                  return await this.kmerService.createKmerFromGene(response);
                });
              resultLine = {};
            }
            const elem = strippedLine.slice(1).split('|');
            resultLine = {
              geneId: elem[1],
              transcriptName: elem[4],
              geneName: elem[5],
              geneType: elem[8],
            };
          } else {
            if (resultLine.hasOwnProperty('sequence')) {
              resultLine.sequence += strippedLine;
            } else {
              resultLine.sequence = strippedLine;
            }
          }
          break;

        case 'rna_central':
          if (this.isTitleSequence(strippedLine)) {
            if (Object.keys(resultLine).length !== 0) {
              await this.geneInfoRepository
                .createGeneInformation(resultLine as CreateGeneInformationDto)
                .then(async (response) => {
                  return await this.kmerService.createKmerFromGene(response);
                });
              resultLine = {};
            }
            const elem = strippedLine.slice(1).split(' ');

            resultLine = {
              geneId: elem[0],
              geneName: strippedLine.match(/\(.*?\)(.+)/)[1] || '',
              sourceName: file.originalname,
            };
          } else {
            if (resultLine.hasOwnProperty('sequence')) {
              resultLine.sequence += strippedLine;
            } else {
              resultLine.sequence = strippedLine;
            }
          }
          break;

        default:
          return {
            error: 'Invalid Type',
            message: 'Current accepted types: ensembl , rna_central',
          };
      }
    }

    if (Object.keys(resultLine).length !== 0) {
      await this.geneInfoRepository
        .createGeneInformation(resultLine as CreateGeneInformationDto)
        .then(async (response) => {
          return await this.kmerService.createKmerFromGene(response);
        });
    }

    return 'All gene informations found has been saved!';
  }

  async getGeneInformationById(id: MongooseSchema.Types.ObjectId) {
    return await this.geneInfoRepository.getGeneInformationById(id);
  }

  async getGeneInformationByTranscript(transcript: string) {
    return await this.geneInfoRepository.getGeneInformationByTranscript(transcript);
  }

  async getGeneInformations(getQueryDto: GetQueryDto) {
    return await this.geneInfoRepository.get(getQueryDto);
  }

  async deleteGeneInformation(id: MongooseSchema.Types.ObjectId) {
    return await this.geneInfoRepository.deleteGeneInformation(id);
  }

  isTitleSequence(line: string): boolean {
    return line[0] === '>';
  }
}
