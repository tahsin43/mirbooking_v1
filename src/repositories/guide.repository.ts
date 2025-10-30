import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  Model,
  Schema as MongooseSchema,
  UpdateQuery,
} from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Guide } from '../schema/guide.schema';
import { CreateGuideDto } from '../modules/guide/dto/createGuide.dto';
import { Kmer } from 'src/schema/k-mer.schema';
import { UpdateGuideDto } from 'src/modules/guide/dto/updateGuide.dto';

export class GuideRepository {
  constructor(
    @InjectModel(Guide.name)
    private readonly guideModel: Model<Guide>,
  ) {}

  async createGuide(createGuideDto: CreateGuideDto) {
    const { info, mirId, organism, sequence } = createGuideDto;
    try {
      const guide = new this.guideModel({
        info,
        mirId,
        organism,
        sequence,
      });
      return await guide.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Trying to save new guide but got error:',
        error,
      );
    }
  }

  async createManyGuide(guides: CreateGuideDto[]) {
    return await this.guideModel
      .insertMany(guides)
      .then((docs) => {
        return {
          message: 'All the guides have been inserted',
          data: docs,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  async getGuides(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let guides: Guide[];

    try {
      if (limit === 0) {
        guides = await this.guideModel
          .find()
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        guides = await this.guideModel
          .find()
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response: ResponseDto;

      if (guides.length > 0) {
        response = {
          ok: true,
          data: guides,
          message: 'Get Guides Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No guide found!',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Trying to fetch guide list but got this error:',
        error,
      );
    }
  }

  async getGuideById(id: MongooseSchema.Types.ObjectId) {
    try {
      const guide: any = await this.guideModel.findById({ _id: id }).exec();

      if (!guide) {
        throw new NotFoundException(`Guide with ID: ${id} Not Found`);
      }
      return guide;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getGuideByGuide(sequence: string) {
    try {
      const guide: any = await this.guideModel.findOne({ sequence }).exec();

      if (!guide) {
        throw new NotFoundException(`Guide with sequence: ${guide} Not Found`);
      }
      return guide;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateGuide(
    id: MongooseSchema.Types.ObjectId,
    updateGuide: UpdateGuideDto,
  ): Promise<Guide> {
    const { info, mirId, organism } = updateGuide;
    const updateData = {
      info,
      mirId,
      organism,
      updatedAt: new Date(),
    };

    try {
      const guide = await this.guideModel
        .findOneAndUpdate({ _id: id }, updateData, {
          new: true,
        })
        .exec();
      return guide;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addKmer(
    folderId: MongooseSchema.Types.ObjectId,
    guideId: MongooseSchema.Types.ObjectId,
  ) {
    return await this.guideModel.updateMany(folderId, guideId);
  }

  async updateMany(filter: FilterQuery<Guide>, update: UpdateQuery<Guide>) {
    return await this.guideModel.updateMany(filter, update);
  }

  async deleteGuide(id: MongooseSchema.Types.ObjectId) {
    await this.guideModel.deleteOne({ id });
  }
}
