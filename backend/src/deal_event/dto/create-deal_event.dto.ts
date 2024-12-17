import {
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

export class CreateDealEventDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsUUID()
  @IsOptional()
  deal_id?: string;

  @IsUUID()
  @IsOptional()
  user_id?: string;
}
