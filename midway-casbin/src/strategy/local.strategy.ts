/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:38:58
 * @LastEditTime : 2023-06-27 22:26:35
 * @FilePath     : \\midway-project\\src\\strategy\\local.strategy.ts
 */
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import {  Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';
@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  redisService: RedisService;

  async validate(payload) {

    const result = await this.redisService.get(`JUSTAUTH::${payload}`);
    if (!result) {
      throw new Error('error ');
    }
    return result;
  }

  getStrategyOptions(): any {
    return {

    };
  }
}
