import { IsNotEmpty, IsString } from 'class-validator';

export class KeyPairDto {
  constructor(pk: string, sk: string) {
    this.PK = pk;
    this.SK = sk;
  }
  @IsString()
  @IsNotEmpty()
  PK: string;

  @IsString()
  @IsNotEmpty()
  SK: string;
}
