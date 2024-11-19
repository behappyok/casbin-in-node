/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-28 13:05:01
 * @LastEditTime : 2024-04-25 18:08:07
 * @FilePath     : \\undefinedd:\\Git\\microapp\\smart-asset-management\\app-auth\\src\\service\\base.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-18 11:42:06
 * @LastEditTime : 2023-06-05 10:12:36
 * @FilePath     : \\server\\src\\service\\base.ts
 */

import { Context } from '@midwayjs/koa';
import { Init, Inject, Logger, Provide } from '@midwayjs/decorator';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ILogger } from '@midwayjs/logger';
import { Resource } from '../entity/Resource.entity';
import { SubjectResource } from '../entity/SubjectResource.entity';
import { Dept } from '../entity/Dept.entity';
import { User } from '../entity/User.entity';
@Provide()
export class BaseService {
  @Inject()
  ctx: Context;
  @Logger()
  logger: ILogger;
  @InjectEntityModel(User, 'prod')
  user: Repository<User>;

  @InjectEntityModel(Dept)
  dept: Repository<Dept>;

  @InjectEntityModel(Resource)
  resource: Repository<Resource>;
  @InjectEntityModel(SubjectResource)
  subjectResource: Repository<SubjectResource>;
  @Init()
  async initial() {}
}
