import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeneInformationDto {
    @IsString()
    @IsNotEmpty()
    readonly geneId: string;

    @IsString()
    @IsOptional()
    readonly transcriptName: string;

    @IsString()
    @IsNotEmpty()
    readonly geneName: string;

    @IsString()
    @IsOptional()
    readonly geneType: string;

    @IsString()
    @IsOptional()
    readonly sourceName: string;

    @IsString()
    sequence: string;

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
