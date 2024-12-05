import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreatePipelineDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(30, {
    message: 'O nome deve ter no máximo 30 caracteres',
  })
  name: string;
  @IsNotEmpty({
    each: true,
    message: 'Os IDs de usuário não podem estar vazios.',
  })
  userIds: string[];
}
