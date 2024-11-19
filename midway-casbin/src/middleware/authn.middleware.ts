/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-15 09:45:47
 * @LastEditTime : 2023-10-30 17:32:11
 * @FilePath     : \\app-auth\\src\\middleware\\authn.middleware.ts
 */
import {
  IMiddleware,
  HttpStatus,
  MidwayHttpError,
  Inject,
} from '@midwayjs/core';
import { Config, Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { RedisServiceFactory } from '@midwayjs/redis';
const cookie = require('cookie');
// import { getManager } from 'typeorm';
// import { User } from '../entity/app/User.entity';
// import { pathMatch } from '../utils/pathMatch';
@Middleware()
export class AuthnMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('koa.globalPrefix')
  globalPrefix;
  // @Inject('instance1')
  // redisService1: RedisService;
  // @Inject('instance2')
  // redisService2: RedisService;
  @Inject()
  redisServiceFactory: RedisServiceFactory;
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      console.log(ctx.path)
      // 控制器前执行的逻辑
      // const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      // ctx.path = ctx.path.replace(/^\/api/, '') || '/';
      // const { path } = ctx;
      // const resource = path.replace(this.globalPrefix, '');
      // const [, token] = header.cookie?.trim().split(' ') || ['', ''];

      // const whitePathList = [
      //   '/authz-static',
      //   '/access/login',
      //   '/me/logout',
      //   '/project/sync',
      //   '/app-tmpl/all',
      //   '/app-tmpl-detail/sync',
      //   '/app-tmpl-detail/by-tmplId',
      // ];
      // const whiteIpList = ['127.0.0.1', ...this.whiteIpList];
      // || whiteIpList.some(ip=>ctx.ip.includes(ip))
      // let result;

      // const ignore = pathMatch(resource, whitePathList);

      const authorizationList = ctx.header['authorization']?.trim()?.split(' ');

      const cookieString = ctx.header['cookie'] || '';

      const cookies = cookie.parse(cookieString);
      let accessToken = cookies.accessToken;
      if (ctx.path.includes('sync')) {
        await next();
        return;
      }
      if (!accessToken) {
        if (authorizationList?.length > 0) {
          accessToken = authorizationList[authorizationList.length - 1];
        }
      }
      if (!accessToken) {
        ctx.status = 401;
        return;
      }
      let result;
      try {
        const result1 = await this.redisServiceFactory
          .get('instance1')
          .hget(`JUSTAUTH::${accessToken}`, 'userInfo');
        result = result1;
      } catch (err) {
        const result2 = await this.redisServiceFactory
          .get('instance1')
          .get(`JUSTAUTH::${accessToken}`);
        const result3 = await this.redisServiceFactory
          .get('instance2')
          .get(`JUSTAUTH::${accessToken}`);

        result = result2 || result3;
      }
      if (!result) {
        ctx.status = 401;
        return;
      }

      try {
        // // // Use the cookie to obtain session data
        // // const sessionData = await getSessionData(cookie);
        // const userId = ctx.session.userId;
        // const manager = getManager();
        // const userRepository = manager.getRepository(User);
        // const user = await userRepository.findOne({ where: { id: userId } });
        // if (user) {
        //   // result =
        //    await next();
        // } else {
        //   // throw new MidwayHttpError(
        //   //   '未登录或会话过期',
        //   //   HttpStatus.UNAUTHORIZED
        //   // );
        //   ctx.status = 401;
        // }

        const JSONbig = require('json-bigint');
        let userId;
        try {
          userId = JSONbig.parse(result)?.userId;
        } catch (e) {
          userId = JSONbig.parse(result)?.pmsUserInfo?.id;
        }

        ctx.request.query['xSubjectId'] = userId.toString();

        if (
          ctx.request.header['x-request-path'] &&
          ctx.request.header['x-request-path'].length > 0
        ) {
          ctx.request.query['xRequestPath'] =
            ctx.request.header['x-request-path'];
        }
      } catch (error) {
        // if (!ignore) {
        //   throw new MidwayHttpError('登录失效', 401);
        // }
        throw new MidwayHttpError('未登录或会话过期', HttpStatus.UNAUTHORIZED);
      }
      await next();
    };
  }

  static getName(): string {
    return 'authn';
  }
}
