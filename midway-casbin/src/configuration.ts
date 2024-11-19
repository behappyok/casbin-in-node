/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:26:38
 * @LastEditTime : 2023-07-03 15:44:44
 * @FilePath     : \\midway-project\\src\\configuration.ts
 */
import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
// import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';
import * as redis from '@midwayjs/redis';
import { AuthnMiddleware } from './middleware/authn.middleware';
import { AuthzMiddleware } from './middleware/authz.middleware';
import * as orm from '@midwayjs/typeorm';
import * as swagger from '@midwayjs/swagger';
import * as DefaultConfig from './config/config.default';
import * as LocalConfig from './config/config.local';

@Configuration({
  imports: [
    info,
    koa,
    validate,
    redis,
    orm,
    jwt,
    passport,
    {
      component: swagger,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
    },
  ],
  // importConfigs:  [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      AuthnMiddleware,
      ReportMiddleware,
      AuthzMiddleware,
    ]);

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
