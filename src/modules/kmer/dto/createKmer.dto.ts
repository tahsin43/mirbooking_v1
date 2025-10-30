import { IsDate,IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateKmerDto {

    @IsString()
    @IsNotEmpty()
    readonly kmerRead: string;

    @IsArray()
    @IsString()
    @IsNotEmpty()
    geneInfo: string[];

    @IsOptional()
    @IsString()
    @IsDate()
    readonly updatedAt: Date;
}
