/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 20:51:03
 * @LastEditTime : 2023-06-27 22:56:49
 * @FilePath     : \\midway-project\\src\\middleware\\redis.middleware.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:39:39
 * @LastEditTime : 2023-06-27 19:31:52
 * @FilePath     : \\midway-project\\src\\middleware\\local.middleware.ts
 */

import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { RedisStrategy } from '../strategy/redis.strategy';

@Middleware()
export class RedisPassportMiddleware extends PassportMiddleware(RedisStrategy) {
  // 设置 AuthenticateOptions
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      // failWithError: true,

    };
  }
}
