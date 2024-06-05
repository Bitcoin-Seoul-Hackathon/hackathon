import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DynamoQueryDto {
  constructor(tableName: string, pk: string) {
    this.TableName = tableName;
    // this.KeyConditionExpression = 'PK = :pk and begins_with(SK, :sk)';
    this.KeyConditionExpression = 'PK = :pk';
    const EAV = new Map();
    EAV.set(':pk', pk);
    this.ExpressionAttributeValues = Object.fromEntries(EAV);
  }
  @IsString()
  @IsNotEmpty()
  TableName: string;

  @IsString()
  @IsNotEmpty()
  KeyConditionExpression: string;

  @IsOptional()
  ExpressionAttributeNames: Record<string, string>;

  @IsOptional()
  ExpressionAttributeValues: Record<string, AttributeValue>;
}
