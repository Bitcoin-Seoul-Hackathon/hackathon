import { AttributeValue, ReturnValue } from '@aws-sdk/client-dynamodb';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DynamoUpdateDto {
  constructor(tableName: string, pk: string, sk: string, items: object) {
    this.TableName = tableName;
    const keyMap = new Map();
    keyMap.set('PK', pk);
    keyMap.set('SK', sk);
    this.Key = Object.fromEntries(keyMap);
    const EAV = new Map();
    const EAN = new Map();

    const properties = Object.getOwnPropertyNames(items);
    this.UpdateExpression = `Set`;

    properties.forEach((property) => {
      this.UpdateExpression += ` #${property} = :${property},`;
      EAV.set(`:${property}`, items[property]);
      EAN.set(`#${property}`, property);
    });
    this.UpdateExpression = this.UpdateExpression.slice(0, -1);

    this.ExpressionAttributeValues = Object.fromEntries(EAV);
    this.ExpressionAttributeNames = Object.fromEntries(EAN);
    this.ReturnValues = 'ALL_NEW';
  }
  @IsString()
  @IsNotEmpty()
  TableName: string;

  @IsNotEmpty()
  Key: Record<string, AttributeValue>;

  @IsOptional()
  UpdateExpression: string;

  @IsOptional()
  ExpressionAttributeNames: Record<string, string>;

  @IsOptional()
  ExpressionAttributeValues: Record<string, AttributeValue>;

  @IsOptional()
  // ReturnValues: 'ALL_NEW'
  ReturnValues: ReturnValue;
}
