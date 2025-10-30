import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { KmerRepository } from '../../repositories/k-mer.repository';
import { CreateKmerDto } from './dto/createKmer.dto';
import { UpdateKmerDto } from './dto/updateKmer.dto';
import { GeneInformationDocument } from 'src/schema/gene-information.schema';

@Injectable()
export class KmerService {
  constructor(private kmerRepository: KmerRepository) {}

  async createKmer(kmer: CreateKmerDto) {
    return await this.kmerRepository.createKmer(kmer);
  }

  async createKmerFromGene(gene: GeneInformationDocument) {
    const tailleKmer = 31;
    const seq = gene.sequence;

    // const promises = [];

    // for (let j = 0; j < seq.length - tailleKmer + 1; j++) {
    //   const kmerRead = seq.slice(j, j + tailleKmer);
    //   const promise = this.kmerRepository
    //     .getKmerByRead(kmerRead)
    //     .then(async (record: any) => {
    //       if (record) {
    //         const uniqueGenes = new Set(record.geneInfo);
    //         uniqueGenes.add(gene._id);
    //         record.geneInfo = Array.from(uniqueGenes);
    //         return await this.kmerRepository.updateKmer(record._id, record);
    //       } else {
    //         return await this.kmerRepository.createKmer({
    //           kmerRead,
    //           geneInfo: [gene._id],
    //         } as CreateKmerDto);
    //       }
    //     });
    //   promises.push(promise);
    // }

    // await Promise.all(promises);
    const locks = new Map<string, Promise<any>>();

    for (let j = 0; j < seq.length - tailleKmer + 1; j++) {
      const kmerRead = seq.slice(j, j + tailleKmer);

      // Check if there's already a pending update/insert operation for this kmerRead value
      let lock = locks.get(kmerRead);

      if (!lock) {
        // If no lock exists, create a new lock and store it in the map
        lock = new Promise<void>(async (resolve, reject) => {
          try {
            const record = await this.kmerRepository.getKmerByRead(kmerRead);

            if (record) {
              const uniqueGenes = new Set(record.geneInfo);
              uniqueGenes.add(gene.transcriptName);
              record.geneInfo = Array.from(uniqueGenes);
              await this.kmerRepository.updateKmer(record._id, record);
            } else {
              await this.kmerRepository.createKmer({
                kmerRead,
                geneInfo: [gene.transcriptName],
              } as CreateKmerDto);
            }

            resolve();
          } catch (err) {
            reject(err);
          } finally {
            // Remove the lock from the map when the operation is done
            locks.delete(kmerRead);
          }
        });

        locks.set(kmerRead, lock);
      }

      // Wait for the lock to be released before proceeding to the next kmerRead value
      await lock;
    }
  }

  async getKmerById(id: MongooseSchema.Types.ObjectId) {
    return await this.kmerRepository.getKmerById(id);
  }

  async getKmerByKmerRead(kmerRead: string) {
    return await this.kmerRepository.getKmerByRead(kmerRead);
  }

  async getKmers(getQueryDto: GetQueryDto) {
    return await this.kmerRepository.getKmers(getQueryDto);
  }

  async updateKmer(id, updateKmerDto: UpdateKmerDto) {
    return await this.kmerRepository.updateKmer(id, updateKmerDto);
  }

  async deleteKmer(id: MongooseSchema.Types.ObjectId) {
    return await this.kmerRepository.deleteKmer(id);
  }
}

/*
createKmerFromGene(gene: GeneInformationDocument) {
  const kmers: CreateKmerDto[] = [];
  const tailleKmer = 31;
  const seq = gene.sequence;

  // create an array of promises
  const promises = [];

  for (let j = 0; j < seq.length - tailleKmer + 1; j++) {
    const kmerRead = seq.slice(j, j + tailleKmer);
    const promise = this.kmerRepository
      .getKmerByRead(kmerRead)
      .then((record: any) => {
        if (record) {
          const uniqueGenes = new Set(record.geneInfo);
          uniqueGenes.add(gene._id);
          record.geneInfo = Array.from(uniqueGenes);
          return this.kmerRepository.updateKmer(record._id, record);
        } else {
          kmers.push({
            kmerRead,
            geneInfo: [gene._id],
            updatedAt: undefined,
          });
        }
      });
    promises.push(promise);
  }

  // wait for all promises to resolve
  return Promise.all(promises)
    .then(() => this.kmerRepository.createManyKmer(kmers))
    .catch((err) => {
      throw new InternalServerErrorException(err);
    });
}
*/
