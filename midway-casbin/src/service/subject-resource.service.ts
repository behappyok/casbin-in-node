/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-15 16:25:04
 * @LastEditTime : 2023-07-05 18:40:20
 * @FilePath     : \\smart-asset-management\\app-auth\\src\\service\\subject-resource.service.ts
 */
import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

// import { In } from 'typeorm';

import { In, Like } from 'typeorm';
import { Resource } from '../entity/Resource.entity';
import { BaseService } from './base';
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class SubjectResourceService extends BaseService {
  async info(id) {
    const result = await this.subjectResource.findOne({ where: { id } });
    return result;
  }
  async findOne(subjectId, resourcePath) {
    const resources = await this.resource.find();
    const resource = resources.find(x => resourcePath.startsWith(x.path));
    if (resource.skipAuthorize) {
      return resource;
    }
    const result = await this.subjectResource.findOne({
      where: { subjectId, resourceCode: resource.name },
    });
    // const result = await this.subjectResource
    //   .createQueryBuilder('subjectResource')
    //   .select('subjectResource.id', 'id')
    //   .where(
    //     'subjectResource.subjectId = :subjectId and subjectResource.resourceId = :resourceId ',
    //     {
    //       subjectId,
    //       resourceId,
    //     }
    //   )
    //   .getSql();

    return result;
  }
  async getAppList(subjectId: string) {
    const subjectResources = await this.subjectResource.find({
      where: { subjectId },
    });
    const resurceCodes = Array.from(
      new Set(subjectResources.map(x => x.resourceCode))
    );
    const appList = await this.resource.find({
      where: [
        {
          name: In(resurceCodes),
          showInPanel: true,
        },
        { skipAuthorize: true, showInPanel: true },
      ],
    });

    return appList;
  }
  async getPrivileged(resourceCode: string) {
    const result = await this.subjectResource.find({
      where: { resourceCode },
    });

    const queryBuilder = this.user
      .createQueryBuilder('user')
      .orderBy('convert(user.user_name using gbk)', 'ASC');

    const users = await queryBuilder.getMany();
    const subjectIds = result.map(x => x.subjectId);
    return users
      .filter(x => subjectIds.includes(x.id))
      .map(x => {
        const { id, user_name: name, avatar } = x;
        return { id, name, avatar, type: 1 };
      });
  }
  async all(title) {
    if (title && title.toString().trim()) {
      return await this.resource.find({
        where: { title: Like(`%${title}%`) },
      });
    } else {
      const result = await this.resource.find();
      return result;
    }
  }

  async updateResource(id, partialEntity: Partial<Resource>) {
    const result = await this.resource.update(id, partialEntity);
    return result;
  }

  async updateBatch(resourceCode: string, subjectIds: string[]) {
    await this.subjectResource.delete({
      resourceCode,
    });
    const entities = subjectIds.map(subjectId => ({ subjectId, resourceCode }));
    const result = await this.subjectResource.insert(entities);
    return result;
  }
  async save(entity) {
    const result = await this.subjectResource.save(entity);
    return result;
  }

  async delete(id) {
    const result = await this.subjectResource.delete(id);
    return result;
  }
}
