import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { InteractionRepository } from 'src/repositories/interaction.repository';
import { GetQueryDto } from '../../dto/getQueryDto';

import { CreateInteractionDto } from './dto/createInteraction.dto';
import { FoldGuideService } from '../mcfold/fold-guide.service';

@Injectable()
export class InteractionService {
  constructor(
    private readonly interactionRepository: InteractionRepository,
    private readonly foldGuideService: FoldGuideService,
  ) {}

  async createInteraction(guide: string, target: string) {
    const record =
      await this.interactionRepository.getInteractionByGuideAndTarget(
        guide,
        target,
      );
    if (record) {
      return { response: record };
    } else {
      try {
        const output = await this.foldGuideService.runFoldGuideTarget(
          guide,
          target,
        );
        console.log(output);
        if (output == 'no seed matching')
          return { response: { message: output } };
        const interaction = this.parseOutput(output);
        interaction.guideSeq = guide;
        interaction.targetSeq = target;
        return {
          response: await this.interactionRepository.createInteraction(
            interaction,
          ),
        };
      } catch (error) {
        return {
          error: {
            message:
              'An error has occurred. \n Please make sure that the sequences you have entered are correct.',
          },
        };
      }
    }
  }

  async getInteractionById(id: MongooseSchema.Types.ObjectId) {
    return await this.interactionRepository.getInteractionById(id);
  }

  async getInteractionByRead(read: string) {
    return await this.interactionRepository.getInteractionByRead(read);
  }

  async getInteractionByGuide(guide: string) {
    return await this.interactionRepository.getInteractionByGuide(guide);
  }

  async getInteractions(getQueryDto: GetQueryDto) {
    return await this.interactionRepository.getInteractions(getQueryDto);
  }

  async deleteInteraction(id: MongooseSchema.Types.ObjectId) {
    return await this.interactionRepository.deleteInteraction(id);
  }

  parseOutput = (output: string): CreateInteractionDto => {
    const regex = /(\w+)\s+(\d+-mer-[\w-]+)/;
    const [, seedPrefix, seedSuffix] = regex.exec(output) || [
      '',
      'Unknown',
      'Unknown',
    ];
    const seedType = `${seedPrefix} ${seedSuffix}`;

    const deltaGRegex = /deltaG:([-]?\d+\.\d+)/;
    const deltaG = deltaGRegex.exec(output)?.[1] || 'NaN';

    const boxRegex = /A:(\d+) B:(\d+) C:(\d+) D:(\d+)/;
    const [, boxA, boxB, boxC, boxD] = boxRegex.exec(output) || [
      '',
      'NaN',
      'NaN',
      'NaN',
      'NaN',
    ];

    const miscoreRegex = /miscore:(\d+(?:\.\d+)?)/;
    const miscore = miscoreRegex.exec(output)?.[1] || 'NaN';

    const bridgeRegex = /bridge:(\d+)/;
    const bridge = bridgeRegex.exec(output)?.[1] || 'NaN';

    const suppBpsRegex = /suppBps:(\d+)/;
    const suppBps = suppBpsRegex.exec(output)?.[1] || 'NaN';

    const extBpsRegex = /extBps:(\d+)/;
    const extBps = extBpsRegex.exec(output)?.[1] || 'NaN';

    const suppGURegex = /suppGU:(\d+)/;
    const suppGU = suppGURegex.exec(output)?.[1] || 'NaN';

    const bulgesSuppRegex = /bulgeNtsSupp:(\d+)/;
    const bulgeNtsSupp = bulgesSuppRegex.exec(output)?.[1] || 'NaN';

    const bulgesTargetRegex = /bulgesTarget:(\d+)/;
    const bulgesTarget = bulgesTargetRegex.exec(output)?.[1] || 'NaN';

    const bulgesGuideRegex = /bulgesGuide:(\d+)/;
    const bulgesGuide = bulgesGuideRegex.exec(output)?.[1] || 'NaN';

    const targetMatch = output.match(/(?:\b|\d)'-([a-zA-Z]+)-\d'/);
    const targetSeq = targetMatch ? targetMatch[0] : '';
    const guideMatch = output.match(/(\d')([\w-]+)-(\d') guide/);
    const guideSeq = guideMatch
      ? guideMatch[1] + guideMatch[2] + '-' + guideMatch[3]
      : '';
    const binding =
      output
        .match(/(?<=\n\s*)\|.*(?=\s*(?:\n|$))/gs)?.[0]
        ?.match(/\|.*?(?=\||$)/g)
        .join('')
        .trim() || '';

    console.log(`${targetSeq} \n ${binding} \n ${guideSeq}`);

    const result = {
      seedType,
      deltaG,
      boxA,
      boxB,
      boxC,
      boxD,
      miscore,
      bridge,
      suppBps,
      extBps,
      suppGU,
      bulgeNtsSupp,
      bulgesTarget,
      bulgesGuide,
      structure: `${targetSeq} \n ${binding} \n ${guideSeq}`,
    };

    return result as CreateInteractionDto;
  };
}
