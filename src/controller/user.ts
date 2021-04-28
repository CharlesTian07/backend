import {
  Controller,
  Get,
  Provide,
  Inject,
  Query,
  Post,
  Body,
  ALL
} from "@midwayjs/decorator";
import { CreateApiDoc } from '@midwayjs/swagger'
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {

  @Inject()
  userService: UserService;

  @CreateApiDoc()
  .description('获取所有用户信息')
  .build()
  @Get('/getAllUsers')
  async getAllUsers() {
    const data = await this.userService.findAllUsers();
    return {code: 0, message: '查询成功', data: data};
  }

  @CreateApiDoc()
  .description('获取用户详情')
  .param('用户id', {
    required: true,
    example: "7de4185c-ae31-42fb-a394-974264e9aede",
    description: '用户id'
  })
  .build()
  @Get('/getUserDetail')
  async getUserByInfo(@Query() id: string) {
    const data = await this.userService.getUserDetail(id);
    return {code: 0, message: '查询成功', data: data};
  }

  @CreateApiDoc()
  .description('更新用户信息')
  .build()
  @Post('/updateUser')
  async updateUser(@Body(ALL) params: object) {
    const data = await this.userService.updateUser(params);
    return {code: 0, message: '更新成功', data: data};
  }

  @CreateApiDoc()
  .description('删除用户')
  .build()
  @Post('/deleteUser')
  async deleteUser(@Body() id: string) {
    const data = await this.userService.deleteUser(id);
    return {code: 0, message: '删除成功', data: data};
  }

  @CreateApiDoc()
  .description('新增用户')
  .build()
  @Post('/addNewUser')
  async addNewUser(@Body(ALL) params: any) {
    const data = await this.userService.addNewUser(params);
    return {code: 0, message: '新增成功', data: data};
  }

  @CreateApiDoc()
  .description('用户登录')
  .build()
  @Post('/login')
  async login(@Body(ALL) params: any) {
    const data = await this.userService.login(params);
    if (data) {
      delete data.password
      return {
        code: 0,
        message: '登录成功',
        data: data
      }
    }
    return {
      code: 1,
      message: '账号或密码有误，请核对后输入'
    }
  }

  @CreateApiDoc()
  .description('修改密码')
  .build()
  @Post('/updatePwd')
  async updatePwd(@Body(ALL) params: any) {
    const data = await this.userService.updatePwd(params);
    if (data) {
      return {
        code: 0,
        message: '修改成功'
      }
    }
    return {
      code: 1,
      message: '账号或旧密码有误，请核对后输入'
    }
  }

}
