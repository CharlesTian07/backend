import {
  Provide,
 } from '@midwayjs/decorator';
 import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';

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

}
