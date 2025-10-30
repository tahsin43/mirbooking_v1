import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateGuideDto {

  @ApiProperty({
    example: "let-7a-5p",
    description:"Example of info attribute"

  })

  @IsString()
  @IsNotEmpty()
  info: string;

  @IsString()
  @IsNotEmpty()
  mirId: string;

  @IsString()
  organism: string;

  @IsString()
  sequence: string;

  @IsOptional()
  @IsString()
  @IsDate()
  updatedAt: Date;
}
