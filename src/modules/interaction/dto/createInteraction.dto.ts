import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  guideSeq: string;

  @IsString()
  targetSeq: string;

  @IsString()
  readonly seedType: string;

  @IsString()
  readonly deltaG: string | number;

  @IsString()
  readonly boxA: string | number;

  @IsString()
  readonly boxB: string | number;

  @IsString()
  readonly boxC: string | number;

  @IsString()
  readonly boxD: string | number;

  @IsString()
  readonly miscore: string | number;

  @IsString()
  readonly bridge: string | number;

  @IsString()
  readonly suppBps: string | number;

  @IsString()
  readonly extBps: string | number;

  @IsString()
  readonly suppGU: string | number;

  @IsString()
  readonly bulgeNtsSupp: string | number;

  @IsString()
  readonly bulgesTarget: string | number;

  @IsString()
  readonly bulgesGuide: string | number;

  @IsString()
  structure: string;

  @IsOptional()
  @IsString()
  @IsDate()
  readonly updatedAt: Date;
}
