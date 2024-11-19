/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-28 13:00:33
 * @LastEditTime : 2023-07-03 16:17:09
 * @FilePath     : \\midway-project\\src\\controller\\authz.controller.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-03-28 17:50:02
 * @LastEditTime : 2023-04-07 13:17:01
 * @FilePath     : \\server\\src\\controller\\application\\authz.controller.ts
 */

import {
  Controller,
  Get,
  Inject,
  Provide,
  Query,
  Body,
  Put,
} from '@midwayjs/decorator';
import { BaseController } from './base.controller';
import { ApiTags } from '@midwayjs/swagger';
import { SubjectResourceService } from '../service/subject-resource.service';
import { DeptService } from '../service/dept.service';
import { Resource } from '../entity/Resource.entity';

@Provide()
@Controller('/authorize')
@ApiTags('授权')
export class AuthzController extends BaseController {
  @Inject()
  service: SubjectResourceService;
  @Inject()
  deptService: DeptService;

  @Get('/sync-dept')
  async syncDept() {
    const ret = await this.deptService.sync();

    return ret;
  }
  @Get('/dept-tree')
  async getDeptEmployeeTree() {
    const ret = await this.deptService.getDeptEmployeeTree();

    return ret;
  }
  @Get('/app')
  async getOrganizationPermissionResult(
    @Query('xSubjectId') xSubjectId: string,
    @Query('xRequestPath') xRequestPath: string
  ) {
    const exists = await this.service.findOne(xSubjectId, xRequestPath);
    if (!exists) {
      this.ctx.status = 403;
    } else {
      this.ctx.status = 200;
    }
  }

  @Put('/put-resource')
  async updateResource(
    @Body('id') id: string,
    @Body('attrs') partAttrs: Partial<Resource>
  ) {
    return this.service.updateResource(id, partAttrs);
  }

  @Get('/get-privileged')
  async getPrivileged(@Query('resourceCode') resourceCode: string) {
    return this.service.getPrivileged(resourceCode);
  }

  @Put('/put-privilege')
  async getStationPermissionResult(
    @Body('resourceCode') resourceCode: string,
    @Body('subjectIds') subjectIds: string[]
  ) {
    return this.service.updateBatch(resourceCode, subjectIds);
  }

  @Get('/app-list')
  async getAppList(@Query('xSubjectId') xSubjectId: string) {
    return this.service.getAppList(xSubjectId);
  }

  @Get('/app-list-all')
  async getAppListAll(@Query('title') title: string) {
    return this.service.all(title);
  }
}
