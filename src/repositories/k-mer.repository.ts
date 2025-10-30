import {
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
import { Kmer } from '../schema/k-mer.schema';
import { CreateKmerDto } from '../modules/kmer/dto/createKmer.dto';
import { UpdateKmerDto } from '../modules/kmer/dto/updateKmer.dto';
import { GeneInformation } from 'src/schema/gene-information.schema';

export class KmerRepository {
  constructor(
    @InjectModel(Kmer.name)
    private readonly kmerModel: Model<Kmer>,
  ) {}

  async createKmer(createKmerDto: CreateKmerDto) {
    const { kmerRead, geneInfo } = createKmerDto;
    const record = await this.kmerModel.findOne({ kmerRead });
    if (record) throw 'Kmer read exist already! ';
    const kmer = new this.kmerModel({
      kmerRead,
      geneInfo: geneInfo,
    });
    try {
      return await kmer.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createManyKmer(kmers: CreateKmerDto[]) {
    return await this.kmerModel
      .insertMany(kmers)
      .then((docs) => {
        return {
          message: 'All the kmer have been inserted',
          data: docs,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  async updateKmer(id: string, updateKmer: UpdateKmerDto) {
    const { kmerRead, geneInfo } = updateKmer;
    const updateData = {
      kmerRead,
      geneInfo,
      updatedAt: new Date(),
    };

    try {
      const folder = await this.kmerModel
        .findOneAndUpdate({ _id: id }, updateData, {
          new: true,
        })
        .exec();
      return folder;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getKmers(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let kmers: Kmer[];

    try {
      if (limit === 0) {
        kmers = await this.kmerModel
          .find()
          .skip(from)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        kmers = await this.kmerModel
          .find()
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (kmers.length > 0) {
        response = {
          ok: true,
          data: kmers,
          message: 'Get Kmers Ok!',
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: 'No  Kmers found!',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getKmerById(id: MongooseSchema.Types.ObjectId) {
    try {
      const kmer: any = await this.kmerModel
        .findById(id)
        .exec();
      return kmer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getKmerByRead(read: string) {
    try {
      const kmer: any = await this.kmerModel
        .findOne({ kmerRead: read })
        .exec();
      return kmer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMany(filter?: FilterQuery<Kmer>, update?: UpdateQuery<Kmer>) {
    return await this.kmerModel.updateMany(filter, update);
  }

  async deleteKmer(id: MongooseSchema.Types.ObjectId) {
    try {
      const kmer = await this.kmerModel.findById(id);
      if (!kmer) {
        throw new NotFoundException(`Kmer with ID: ${id} Not Found`);
      }

      await this.kmerModel.deleteOne({ id });
      return { message: 'Kmer has been delete' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
