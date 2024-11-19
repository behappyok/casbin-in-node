/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-15 09:45:47
 * @LastEditTime : 2023-06-28 13:32:05
 * @FilePath     : \\midway-project\\src\\middleware\\authz.middleware.ts
 */
import { HttpStatus, IMiddleware, MidwayHttpError } from '@midwayjs/core';
import { Config, Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
// import { SubjectResouce } from '../service/subject-resource.service';

@Middleware()
export class AuthzMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('koa.globalPrefix')
  globalPrefix;
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // const service = await ctx.requestContext.getAsync(SubjectResouce);
      // const context = await service.buildContextFromKoaCtx(ctx);

      const hasPermission =true // await service.checkPermission(ctx);
      if (!hasPermission) {
        throw new MidwayHttpError('没有权限', HttpStatus.FORBIDDEN);
      }

      await next();
    };
  }

  static getName(): string {
    return 'authz';
  }


}
