import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { GeneInformation } from 'src/schema/gene-information.schema';
import { CreateGeneInformationDto } from 'src/modules/geneInfo/dto/createGeneInfo.dto';

export class GeneInformationRepository {
  constructor(
    @InjectModel(GeneInformation.name)
    private readonly geneInfoModel: Model<GeneInformation>,
  ) {}

  /**
   * Fetches all geneInfo from database
   * @returns {Promise<GeneInformation>} queried user data
   */

  async get(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let geneInfos: GeneInformation[];

    try {
      if (limit === 0) {
        geneInfos = await this.geneInfoModel
          .find()
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        geneInfos = await this.geneInfoModel
          .find()
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response: {
        ok: boolean;
        data: GeneInformation[] | undefined[];
        message: string;
      };

      if (geneInfos.length > 0) {
        response = {
          ok: true,
          data: geneInfos,
          message: 'Get Genes Informations OK!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No Genes Informations found!',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Fetches a geneInfo from database by MongooseSchema ObjectId
   * @param {string} id
   * @returns {Promise<GeneInformation>} queried geneInfo data
   */

  async getGeneInformationById(
    id: MongooseSchema.Types.ObjectId,
  ): Promise<GeneInformation> {
    try {
      const geneInfo: any = await this.geneInfoModel.findById(id);
      if (!geneInfo) {
        throw new NotFoundException(`GeneInformation with ID: ${id} Not Found`);
      }
      return geneInfo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getGeneInformationByTranscript(transcript: string) {
    try {
      const geneInfo: any = await this.geneInfoModel.findOne({
        transcriptName: transcript,
      });
      if (!geneInfo) {
        throw new NotFoundException(
          `GeneInformation with transcript name: ${transcript} Not Found`,
        );
      }
      return geneInfo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGeneInformation(
    createGeneInformationDto: CreateGeneInformationDto,
  ) {
    const newGeneInformation = new this.geneInfoModel({
      ...createGeneInformationDto,
    });
    try {
      return await newGeneInformation.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createManyGeneInformation(
    geneInformations: CreateGeneInformationDto[],
  ) {
    return await this.geneInfoModel
      .insertMany(geneInformations)
      .then((docs) => {
        return {
          message: 'All the gene have been inserted',
          data: docs,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  async deleteGeneInformation(id: MongooseSchema.Types.ObjectId) {
    try {
      const geneInfo = await this.geneInfoModel.findById(id);
      if (!geneInfo) {
        throw new NotFoundException(
          `Gene Information with _id: ${id} Not Found`,
        );
      }

      await this.geneInfoModel.deleteOne({ id });
      return { message: 'Gene Information has been delete' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
