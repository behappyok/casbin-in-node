/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 20:47:36
 * @LastEditTime : 2023-06-28 13:49:25
 * @FilePath     : \\midway-project\\src\\strategy\\redis.strategy.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:38:58
 * @LastEditTime : 2023-06-27 19:46:27
 * @FilePath     : \\midway-project\\src\\strategy\\local.strategy.ts
 */
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';
import { MidwayHttpError } from '@midwayjs/core';
@CustomStrategy()
export class RedisStrategy extends PassportStrategy(Strategy, 'redis') {
  @Inject()
  redisService: RedisService;

  async validate(req,token) {
    console.log(1)
    console.log(req)
    const result = await this.redisService.get(`JUSTAUTH::${token}`);
    console.log(2)
    if (!result) {
      throw new MidwayHttpError('Unauthorized', 401);

    }
    return result;
  }

  getStrategyOptions(): any {
    return {
        passReqToCallback: true,
    };
  }
}
