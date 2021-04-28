import {
  Provide,
 } from '@midwayjs/decorator';
 import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
const dayjs = require('dayjs')
@Provide()
export class UserService {

  @InjectEntityModel(User)
  UserModel: Repository<User>;

  async findAllUsers() {
    let [allUserDatas, usersCount] = await this.UserModel.findAndCount();
    return {
      content: allUserDatas,
      total: usersCount
    }
  }

  async getUserDetail(id) {
    let data = await this.UserModel.findOne({ id });
    return data
  }

  async updateUser(params) {
    let data = await this.UserModel.findOne({ id: params.id });
    data = {
      ...data,
      ...params,
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    await this.UserModel.save(data)
    return {}
  }

  async deleteUser(id) {
    let data = await this.UserModel.findOne({ id });
    await this.UserModel.remove(data)
    return {}
  }

  async addNewUser(params) {
    params.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    params.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    params.password = '123456',
    params.status = 1
    let data = await this.UserModel.save(params);
    return data
  }

  async login(params) {
    let data = await this.UserModel.findOne({
      username: params.username,
      password: params.password
    });
    return data
  }

  async updatePwd(params) {
    let data = await this.UserModel.findOne({
      username: params.username,
      password: params.oldPwd
    });
    if (data) {
      data.password = params.newPwd
      await this.UserModel.save(data)
      return true
    }
    return false
  }

}
