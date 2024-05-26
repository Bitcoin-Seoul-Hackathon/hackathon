import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRegisterDto } from './user-register.dto';

export class UserRegisterVo {
  @IsString()
  @IsNotEmpty()
  PK: string;

  @IsString()
  @IsNotEmpty()
  SK: string;

  static fromRegisterUserDto(dto: UserRegisterDto) {
    const vo = new UserRegisterVo();
    vo.PK = `Address#${dto.address}`;
    vo.SK = `TelegramID#${dto.telegramID}`;
    return vo;
  }
}
