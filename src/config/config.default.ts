import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { IApplicationLocals } from '../../typings/app';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619420999976_6928';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // 关闭安全校验
   config.security = {
    csrf: {
      enable: false,
    }
  }

  // token校验机制(ignore中部分路径忽略token校验)
  config.jwt = {
    enable: true,
    secret: 'backend',
    ignore: [
      (ctx: IApplicationLocals) => ctx.path === '/',
      '/user/login',
    ]
  }

  config.orm = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'backend',
    synchronize: true,
    logging: false,
  }

  return config;
};

