import { IsEmail, IsEnum } from 'class-validator';
import {
  EnumConfirmation,
  TEnumConfirmationType,
} from '../../enum/EnumConfirmation';

export class CreateConfirmationCodeDto {
  @IsEmail()
  email: string;

  @IsEnum(EnumConfirmation)
  type: TEnumConfirmationType;
}
