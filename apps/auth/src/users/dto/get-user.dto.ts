import { IsNotEmpty, IsString } from 'class-validator';

export class getUserDTO {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
