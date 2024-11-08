import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreatePipelinePhaseDto {
  id?: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome deve ter no maximo 50 caracteres',
  })
  name: string;
  @IsDate()
  created_at?: Date;
  updated_at?: Date;
}
