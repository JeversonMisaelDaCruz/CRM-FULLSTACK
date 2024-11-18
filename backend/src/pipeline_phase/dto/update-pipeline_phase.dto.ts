import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePipelinePhaseDto {
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome deve ter no máximo 50 caracteres',
  })
  name?: string;

  created_at?: Date;
  updated_at?: Date;

  @IsNotEmpty()
  @IsString()
  pipeline_id?: string;
}
