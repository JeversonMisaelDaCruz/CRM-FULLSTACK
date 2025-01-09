import { IsOptional, IsString } from 'class-validator';

export class UpdateDealEventDto {
  @IsString()
  @IsOptional()
  message: string;
  @IsOptional()
  date: Date;
  @IsOptional()
  done?: boolean;
  @IsOptional()
  deal_id?: string;
  @IsOptional()
  user_id?: string;
}
