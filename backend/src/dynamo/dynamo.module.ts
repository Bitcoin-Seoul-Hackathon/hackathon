import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamoService } from './dynamo.service';

@Module({
  imports: [ConfigModule, ConfigService],
  exports: [DynamoService],
  providers: [DynamoService],
})
export class DynamoModule {}
