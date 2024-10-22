import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  })
  @MaxLength(100)
  name: string;
  @IsNotEmpty({
    message: 'O e-mail deve ser informado',
  })
  @IsString()
  @MaxLength(90, {
    message:
      'O e-mail deve ter o maximo de 120 caracteres. Por favor, tente novamente.',
  })
  @MinLength(6, {
    message:
      'A senha deve ter pelo menos 6 caracteres. Por favor, tente novamente.',
  })
  @IsEmail(
    {},
    {
      message:
        'E-mail inválido. Por favor, forneça um endereço de e-mail válido.',
    },
  )
  email: string;
  @IsNotEmpty({
    message: 'o Status deve ser informado',
  })
  @IsString()
  @MinLength(2, {
    message: 'o Status deve ter pelo menos 2 caracteres',
  })
  @MaxLength(20, {
    message: 'o Status deve ter no maximo 20 caracteres',
  })
  status: string;
  @IsNotEmpty({
    message: 'o Telefone deve ser informado',
  })
  @IsString()
  @MinLength(2, {
    message:
      'O Telefone deve ter pelo menos 2 caracteres. Por favor, tente novamente.',
  })
  @MaxLength(17, {
    message:
      'O Telefone deve ter no maximo 17 aracteres. Por favor, tente novamente.',
  })
  phone: string;
}
