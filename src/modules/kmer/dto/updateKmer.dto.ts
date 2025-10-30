import { PartialType } from '@nestjs/mapped-types';

import { CreateKmerDto } from './createKmer.dto';

export class UpdateKmerDto extends PartialType(CreateKmerDto) {}
