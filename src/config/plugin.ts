import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false,
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
} as EggPlugin;
