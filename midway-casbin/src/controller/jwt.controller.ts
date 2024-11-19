/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:26:38
 * @LastEditTime : 2023-06-27 18:40:18
 * @FilePath     : \\midway-project\\src\\controller\\home.controller.ts
 */
import { Post, Inject, Controller } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/')
export class JwtController {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    return { jwt: 'valid' };
  }

  @Post('/jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }, { algorithm: 'RS256' }),
    };
  }
}
