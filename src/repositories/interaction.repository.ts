import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { Interaction } from '../schema/interaction.schema';
import { CreateInteractionDto } from '../modules/interaction/dto/createInteraction.dto';

export class InteractionRepository {
  constructor(
    @InjectModel(Interaction.name)
    private readonly interactionModel: Model<Interaction>,
  ) {}

  async createInteraction(interactionDto: CreateInteractionDto) {
    const interaction = new this.interactionModel({
      ...interactionDto,
    });
    try {
      return await interaction.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createManyInteraction(interactions: CreateInteractionDto[]) {
    return await this.interactionModel
      .insertMany(interactions)
      .then((docs) => {
        return {
          message: 'All the interaction have been inserted',
          data: docs,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  async getInteractions(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let interactions: Interaction[];

    try {
      if (limit === 0) {
        interactions = await this.interactionModel
          .find()
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        interactions = await this.interactionModel
          .find()
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (interactions.length > 0) {
        response = {
          ok: true,
          data: interactions,
          message: 'Get Interactions Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No  Interactions found!',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInteractionById(id: MongooseSchema.Types.ObjectId) {
    try {
      const interaction: any = await this.interactionModel.findById(id).exec();
      return interaction;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInteractionByRead(read: string) {
    try {
      const interaction: any[] = await this.interactionModel
        .find({ targetSeq: read })
        .exec();
      return interaction.length
        ? {
            message: `Read ${read} interactions found!`,
            interactions: interaction,
          }
        : `No interactions found! for ${read} `;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInteractionByGuide(guide: string) {
    try {
      const interaction: any[] = await this.interactionModel
        .find({ guideSeq: guide })
        .exec();
      return interaction.length
        ? {
            message: `Guide ${guide} interactions found!`,
            interactions: interaction,
          }
        : `No interactions found! for ${guide}`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getInteractionByGuideAndTarget(guide: string, target: string) {
    try {
      return await this.interactionModel
        .findOne({ guideSeq: guide, targetSeq: target })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteInteraction(id: MongooseSchema.Types.ObjectId) {
    try {
      const interaction = await this.interactionModel.findById(id);
      if (!interaction) {
        throw new NotFoundException(`Interaction with ID: ${id} Not Found`);
      }

      await this.interactionModel.deleteOne({ id });
      return { message: 'Interaction has been delete' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
