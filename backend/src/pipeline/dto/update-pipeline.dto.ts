import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePipelineDto {
  @IsString()
  @IsOptional()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(30, {
    message: 'O nome deve ter no máximo 30 caracteres',
  })
  name?: string;
}
