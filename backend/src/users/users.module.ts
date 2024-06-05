import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DynamoModule } from 'src/dynamo/dynamo.module';

@Module({
  imports: [DynamoModule],
  providers: [UsersService],
})
export class UsersModule {}
