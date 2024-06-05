import { IsNotEmpty, IsString } from 'class-validator';

export class GetItemDto {
  constructor(tableName: string, key: object) {
    this.TableName = tableName;
    this.Key = key;
  }
  @IsString()
  @IsNotEmpty()
  TableName: string;

  @IsString()
  @IsNotEmpty()
  Key: object;
}
