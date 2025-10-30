import { createReadStream } from 'fs';
import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { GuideRepository } from '../../repositories/guide.repository';
import { CreateGuideDto } from './dto/createGuide.dto';
import { UpdateGuideDto } from './dto/updateGuide.dto';

@Injectable()
export class GuideService {
  constructor(private readonly guideRepository: GuideRepository) {}

  async createGuide(file: Express.Multer.File) {
    const guideDocuments: CreateGuideDto[] = [];
    const lines = file.buffer.toString('utf-8');
    let resultLine: Partial<CreateGuideDto> = {};

    for (const line of lines.split('\n')) {
      if (this.isTitleSequence(line)) {
        if (Object.keys(resultLine).length !== 0) {
          // save here
          await this.guideRepository
            .createGuide(resultLine as CreateGuideDto)
            .then(
              () =>
                (resultLine = {
                  info: '',
                  mirId: '',
                  organism: '',
                  sequence: '',
                }),
            );
          resultLine = {
            info: '',
            mirId: '',
            organism: '',
            sequence: '',
          };
        }

        const ln = line.split(' ');
        resultLine = {
          info: ln[0].slice(1),
          mirId: ln[1],
          organism: ln.slice(2, 4).join('-'),
          sequence: '',
        };
      } else {
        if (resultLine.hasOwnProperty('sequence')) {
          resultLine.sequence += line;
        } else {
          resultLine.sequence = line;
        }
      }
    }

    if (Object.keys(resultLine).length !== 0) {
      await this.guideRepository.createGuide(resultLine as CreateGuideDto);
    }

    return 'All guides found has been saved!';
  }

  async getGuides(getQueryDto: GetQueryDto) {
    return await this.guideRepository.getGuides(getQueryDto);
  }

  async getGuideById(id: MongooseSchema.Types.ObjectId) {
    return await this.guideRepository.getGuideById(id);
  }

  async getGuideByGuide(guide: string) {
    return await this.guideRepository.getGuideByGuide(guide);
  }

  async updateGuide(
    id: MongooseSchema.Types.ObjectId,
    updateGuide: UpdateGuideDto,
  ) {
    return await this.guideRepository.updateGuide(id, updateGuide);
  }

  async deleteGuide(id: MongooseSchema.Types.ObjectId) {
    await this.guideRepository.deleteGuide(id);
  }

  isTitleSequence(line: string): boolean {
    return line.startsWith('>');
  }
}
