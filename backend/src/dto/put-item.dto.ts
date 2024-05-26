import { IsNotEmpty, IsString } from 'class-validator';

export class PutItemDto {
  constructor(tableName: string, item: object) {
    this.TableName = tableName;
    this.Item = item;
  }
  @IsString()
  @IsNotEmpty()
  TableName: string;

  @IsString()
  @IsNotEmpty()
  Item: Record<string, any>;
}
