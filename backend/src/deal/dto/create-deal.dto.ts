import {
  IsString,
  IsOptional,
  IsDate,
  IsUUID,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateDealDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsIn(['go', 'nogo', 'pending'])
  status?: 'go' | 'nogo' | 'pending';

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsDate()
  due_date?: Date;

  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
  pipeline_phase_id?: string;

  @IsOptional()
  @IsUUID()
  lead_id?: string;
}
