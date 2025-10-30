import { PartialType } from '@nestjs/mapped-types';

import { CreateGuideDto } from './createGuide.dto';

export class UpdateGuideDto extends PartialType(CreateGuideDto) { }
