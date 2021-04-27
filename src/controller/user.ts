import {
  Controller,
  Get,
  Provide,
  Inject,
  Query,
} from "@midwayjs/decorator";
import { UserService } from '../service/user';

@Provide()
@Controller('/api/user')
export class UserController {

  @Inject()
  userService: UserService;

  @Get('/getAllUsers')
  async getAllUsers() {
    const data = await this.userService.findAllUsers();
    return {success: true, message: 'OK', data: data};
  }

  @Get('/getUserDetail')
  async getUserByInfo(@Query() id: number) {
    const data = await this.userService.getUserDetail(id);
    return {success: true, message: 'OK', data: data};
  }

}
