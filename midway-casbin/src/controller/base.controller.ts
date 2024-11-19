/*
 * @Description  : 
 * @Author       : zyl
 * @Date         : 2023-06-28 13:32:52
 * @LastEditTime : 2023-06-28 13:32:52
 * @FilePath     : \\midway-project\\src\\controller\\base.controller.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-25 10:08:19
 * @LastEditTime : 2023-04-03 18:00:24
 * @FilePath     : \\server\\src\\controller\\base.controller.ts
 */
import { Context } from '@midwayjs/koa';
import { Init, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

export class BaseController {
  @Inject()
  ctx: Context;
  userId;
  @Logger()
  logger: ILogger;
  @Init()
  init() {
    this.userId = this.ctx.session?.userId;
  }
}
