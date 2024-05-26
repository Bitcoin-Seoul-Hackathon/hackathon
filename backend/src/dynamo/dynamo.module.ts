import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamoService } from './dynamo.service';

@Module({
  imports: [ConfigModule],
  exports: [DynamoService],
  providers: [DynamoService],
})
export class DynamoModule {}
