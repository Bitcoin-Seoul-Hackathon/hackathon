import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DynamoModule } from './dynamo/dynamo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/.env`,
    }),
    UsersModule,
    DynamoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
