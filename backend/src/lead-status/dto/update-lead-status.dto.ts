import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class UpdateLeadStatusDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(30, {
    message: 'O nome deve ter no maximo 30 caracteres',
  })
  name?: string;
}
