/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:39:39
 * @LastEditTime : 2023-06-27 19:31:52
 * @FilePath     : \\midway-project\\src\\middleware\\local.middleware.ts
 */

import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';

@Middleware()
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  // 设置 AuthenticateOptions
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {

    };
  }
}

