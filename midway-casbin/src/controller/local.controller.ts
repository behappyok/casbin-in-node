/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 19:30:02
 * @LastEditTime : 2023-06-27 19:32:19
 * @FilePath     : \\midway-project\\src\\controller\\local.controller.ts
 */
// src/controller.ts
import { Post, Inject, Controller } from '@midwayjs/core';
import { LocalPassportMiddleware } from '../middleware/local.middleware';
import { Context } from '@midwayjs/koa';
@Controller('/')
export class LocalController {

  @Inject()
  ctx: Context;

  @Post('/passport/local', { middleware: [LocalPassportMiddleware] })
  async localPassport() {
    console.log('local user: ');
    return this.ctx.state.user;
  }
}
