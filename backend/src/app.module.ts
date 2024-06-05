import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DynamoModule } from './dynamo/dynamo.module';
import { DynamoService } from './dynamo/dynamo.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    DynamoModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/.env`,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DynamoService, UsersService],
})
export class AppModule {}
