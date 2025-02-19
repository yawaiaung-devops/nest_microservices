import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';
import { CreateChargeDto } from '@app/common';

export class PaymentDto extends CreateChargeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
