import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRegisterDto } from './user-register.dto';

export class UserRegisterVo {
  @IsString()
  @IsNotEmpty()
  PK: string;

  @IsString()
  @IsNotEmpty()
  SK: string;

  @IsString()
  @IsNotEmpty()
  telegramID: string;

  static fromRegisterUserDto(dto: UserRegisterDto) {
    const vo = new UserRegisterVo();
    vo.PK = 'user';
    vo.SK = dto.address;
    vo.telegramID = dto.telegramID;
    return vo;
  }
}
