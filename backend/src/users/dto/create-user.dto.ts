import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11, {
    message:
      'O Cpf deve ter pelo menos 11 caracteres. Por favor, tente novamente.',
  })
  @MaxLength(11, {
    message:
      'O Cpf deve ter no maximo 11 aracteres. Por favor, tente novamente.',
  })
  identifier: string;
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  @MaxLength(130, {
    message:
      'A senha deve ter no maximo 130 caracteres. Por favor, tente novamente.',
  })
  password: string;
}
