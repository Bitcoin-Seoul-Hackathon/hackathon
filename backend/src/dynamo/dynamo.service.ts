import { Injectable, Logger } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
// import { PutItemDto } from 'src/dto/put-item.dto';
// import { DynamoQueryDto } from 'src/dto/dynamo-query.dto';
import { KeyPairDto } from 'src/dto/key-pair.dto';
// import { DynamoUpdateDto } from 'src/dto/dynamo-update.dto';
import { GetItemDto } from 'src/dto/get-item.dto';
import { PutItemDto } from 'src/dto/put-item.dto';
import { DynamoQueryDto } from 'src/dto/dynamo-query.dto';
import { DynamoUpdateDto } from 'src/dto/dynamo-update.dto';

@Injectable()
export class DynamoService {
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;
  tableName: string;

  constructor(private readonly config: ConfigService) {
    const marshallOptions = {
      // Whether to automatically convert empty strings, blobs, and sets to `null`.
      convertEmptyValues: false, // false, by default.
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: false, // false, by default.
      // Whether to convert typeof object to map attribute.
      convertClassInstanceToMap: false, // false, by default.
    };

    const unmarshallOptions = {
      // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
      wrapNumbers: false, // false, by default.
    };

    const translateConfig = { marshallOptions, unmarshallOptions };

    this.client = new DynamoDBClient({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.config.get('DYNAMO_DB_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get('DYNAMO_DB_SECRET_ACCESS_KEY'),
      },
    });
    this.docClient = DynamoDBDocumentClient.from(this.client, translateConfig);
    this.tableName = this.config.get('TABLE_NAME');
  }

  private readonly logger = new Logger(DynamoService.name);

  // Insert single record to DB
  async insert(item: object): Promise<any> {
    const itemWithType = this.typeInsertToDto(item);

    const putItemDto = new PutItemDto(
      this.tableName,
      Object.fromEntries(itemWithType),
    );

    this.logger.log(item);
    this.logger.log(putItemDto);

    const command = new PutItemCommand(putItemDto);

    const response = await this.client.send(command);
    // const response = await this.docClient.send(command);
    this.logger.log(response);
    return response;
  }

  async select(item: object): Promise<any> {
    const getItemDto = new GetItemDto(this.tableName, item);
    const command = new GetCommand(getItemDto);
    const response = await this.docClient.send(command);
    this.logger.log(response);
    return response;
  }

  async query(item: KeyPairDto): Promise<any> {
    const queryDto = new DynamoQueryDto(this.tableName, item.PK);
    console.log(this.tableName, item.PK);
    this.logger.log(queryDto);
    const command = new QueryCommand(queryDto);
    const response = await this.docClient.send(command);
    // const response = await this.client.send(command);
    this.logger.log(response);
    return response;
  }

  async update(keyPair: KeyPairDto, item: object): Promise<any> {
    const updateDto = new DynamoUpdateDto(
      this.tableName,
      keyPair.PK,
      keyPair.SK,
      item,
    );
    // const command = new UpdateItemCommand(updateDto);
    const command = new UpdateCommand(updateDto);
    this.logger.log(updateDto);
    const response = await this.docClient.send(command);
    this.logger.log(response);
    return response;
  }

  // async selectBeginWith(tableName: string, pk: any, sk: any): Promise<any> {}

  // async delete(tableName: string, pk: any, sk: any): Promise<any> {}

  // async deleteCondition(tableName: string, condi: string): Promise<any> {}

  // async update(tableName: string, item: object): Promise<any> {}

  // removeDynamoDataType(map: object) {}

  getTypeCode(prop: any) {
    if (typeof prop == 'string') {
      return 'S';
    } else if (typeof prop == 'number') {
      return 'N';
    } else if (typeof prop == 'object') {
      return 'O';
    } else if (typeof prop == 'boolean') {
      return 'BOOL';
    }
  }

  typeInsertToDto(item: object) {
    const itemWithType = new Map<string, any>();
    const properties = Object.getOwnPropertyNames(item);

    properties.forEach((property) => {
      const typeCode = this.getTypeCode(item[property]);
      itemWithType.set(property, { [typeCode]: item[property].toString() });
    });
    return itemWithType;
  }
}
