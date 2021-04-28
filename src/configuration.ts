import { App, Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/orm';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';

@Configuration({
  imports: [orm, swagger],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
