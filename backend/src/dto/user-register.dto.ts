import { IsNotEmpty, IsString } from 'class-validator';
import { UserRegisterVo } from './user-register.vo';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  telegramID: string;

  static fromRegisterUserVo(vo: UserRegisterVo) {
    const dto = new UserRegisterDto();
    dto.address = vo.PK.split('#')[2];
    dto.telegramID = vo.SK.split('#')[2];
    return dto;
  }
}
