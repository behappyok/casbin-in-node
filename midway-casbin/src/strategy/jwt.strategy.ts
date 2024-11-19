/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:38:58
 * @LastEditTime : 2023-06-27 19:05:07
 * @FilePath     : \\midway-project\\src\\strategy\\jwt.strategy.ts
 */
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Config } from '@midwayjs/core';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig;

  async validate(payload) {
    console.log(payload)
    return payload;
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}
