import { Injectable } from '@nestjs/common';
import { KeyPairDto } from 'src/dto/key-pair.dto';
import { UserRegisterDto } from 'src/dto/user-register.dto';
import { UserRegisterVo } from 'src/dto/user-register.vo';
import { DynamoService } from 'src/dynamo/dynamo.service';

@Injectable()
export class UsersService {
  constructor(private dynamo: DynamoService) {}

  async getUser(payload: UserRegisterDto) {
    const userRegisterVo = UserRegisterVo.fromRegisterUserDto(payload);
    const pk = userRegisterVo.PK;
    const sk = userRegisterVo.SK;
    const keyPairDto = new KeyPairDto(pk, sk);
    const userList = await this.dynamo.query(keyPairDto);
    console.log(userList.Items);
    return userList.Items[0];
  }

  async getUsers() {
    const pk = 'Address';
    const sk = 'TelegramID';
    const keyPairDto = new KeyPairDto(pk, sk);
    const userList = await this.dynamo.query(keyPairDto);
    console.log(userList.Items);
    return userList.Items;
  }

  async registerUser(payload: UserRegisterDto) {
    const userRegisterVo = UserRegisterVo.fromRegisterUserDto(payload);
    await this.dynamo.insert(userRegisterVo);
    return;
  }
}
