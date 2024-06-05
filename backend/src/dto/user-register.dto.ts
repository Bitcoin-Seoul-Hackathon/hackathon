import { IsNotEmpty, IsString } from 'class-validator';
import { UserRegisterVo } from './user-register.vo';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  pk: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  telegramID: string;

  static fromRegisterUserVo(vo: UserRegisterVo) {
    const dto = new UserRegisterDto();
    dto.address = vo.SK;
    dto.telegramID = vo.telegramID;
    return dto;
  }
}
