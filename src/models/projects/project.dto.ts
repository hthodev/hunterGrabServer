import { Expose, Type } from 'class-transformer';
import { IsString, IsEnum, IsArray, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Types } from 'mongoose';


class InvestmentDto {
  @Expose()
  @IsString()
  readonly slug: string;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly logo: string;

  @Expose()
  @IsNumber()
  readonly tier: number;

  @Expose()
  @IsBoolean()
  readonly isLead: boolean;
}

export class ProjectDto {
  @Expose()
  readonly _id: Types.ObjectId;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly slug: string;

  @Expose()
  @IsEnum(["Potential", "Confirmed", "Listed", "Distributed", "Verification"])
  readonly status: "Potential" | "Confirmed" | "Listed" | "Distributed" | "Verification";

  @Expose()
  @IsString()
  readonly symbol: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  readonly raise: number;

  @Expose()
  @IsOptional()
  @IsString()
  readonly logo: string;

  @Expose()
  @IsOptional()
  @IsString()
  readonly numberSuffixes: string;

  @Expose()
  @IsArray()
  @Type(() => InvestmentDto)
  readonly investments: InvestmentDto[];
}
