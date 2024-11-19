/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 19:30:45
 * @LastEditTime : 2023-06-27 19:31:01
 * @FilePath     : \\midway-project\\src\\middleware\\jwt.middleware.ts
 */
import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }
}
