/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-07-03 10:50:08
 * @LastEditTime : 2023-12-08 14:34:45
 * @FilePath     : \\app-auth\\src\\service\\dept.service.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-02-15 16:25:04
 * @LastEditTime : 2023-06-30 14:56:07
 * @FilePath     : \\midway-project\\src\\service\\subject-resource.service.ts
 */
import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

import { BaseService } from './base';
import { Dept } from '../entity/Dept.entity';
const axios = require('axios');
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class DeptService extends BaseService {
  @Config('dingtalk')
  dingtalk;

  async getDeptEmployeeTree() {
    // const users = await this.user.find({ order: { convert(user_name using gbk) : 'asc' } });

    const queryBuilder = this.user
      .createQueryBuilder('user')
      .orderBy('convert(user.user_name using gbk)', 'ASC');

    const users = await queryBuilder.getMany();
    const departments = await this.dept.find();

    // 构建树状结构
    const buildTree = parentId => {
      const tree = [];

      // 遍历部门表，找到父级ID为parentId的部门
      const childDepartments = departments.filter(
        department => department.parent_id == parentId
      );

      // 遍历人员表，找到所属部门ID为parentId的人员
      const childUsers = users.filter(user => {
        try {
          let userDeptIds = JSON.parse(user.dingtalk_dept_id);
          userDeptIds = userDeptIds.map(x => x.toString());

          return userDeptIds.includes(parentId.toString());
        } catch {
          console.log('json parse error');
          return [];
        }
      });

      // 遍历子部门，递归构建子树
      for (const department of childDepartments) {
        const node = {
          id: department.dept_id,
          name: department.name,
          type: 0,
          children: buildTree(department.dept_id),
        };

        tree.push(node);
      }

      // 遍历人员，将人员作为叶子节点添加到树中
      for (const user of childUsers) {
        const node = {
          id: user.id,
          name: user.user_name,
          avatar: user.avatar,
          type: 1,
        };

        tree.push(node);
      }

      return tree;
    };

    // 从根部门开始构建树状结构
    const targetData = buildTree(1);
    return targetData;
  }

  async sync() {

    const dingtalk = this.dingtalk;
    const accessTokenUrl = `https://oapi.dingtalk.com/gettoken?appkey=${dingtalk.appId}&appsecret=${dingtalk.appSecret}`;

    const accessTokenResponse = (await axios.get(accessTokenUrl))?.data;

    const accessToken = accessTokenResponse?.['access_token'];

    try {
      await this.getDepartmentTree(accessToken);
      return { success: true };
    } catch (ex) {
      return { success: false, msg: ex };
    }
  }

  // 获取部门树数据
  async getDepartmentTree(accessToken) {
    // 获取根部门列表
    const rootDepartments = await this.getSubDepartments(accessToken);

    // 开始遍历部门树
    await this.traverseDepartmentTree(accessToken, rootDepartments);
  }

  // 获取子部门列表
  async getSubDepartments(accessToken, deptId = null) {
    let url = `https://oapi.dingtalk.com/topapi/v2/department/listsub?access_token=${accessToken}`;
    if (deptId) {
      url = `https://oapi.dingtalk.com/topapi/v2/department/listsub?access_token=${accessToken}&dept_id=${deptId}`;
    }

    const response = await axios.get(url);
    const data = response.data;

    if (data.errcode === 0) {
      return data.result;
    } else {
      console.error('Failed to get sub departments:', data.errmsg);
      return [];
    }
  }

  // 递归遍历部门树
  async traverseDepartmentTree(accessToken, departments) {
    for (const department of departments) {
      // 创建部门实体对象
      const departmentEntity = new Dept();
      departmentEntity.auto_add_user = department.auto_add_user;
      departmentEntity.create_dept_group = department.create_dept_group;
      departmentEntity.dept_id = department.dept_id;
      departmentEntity.ext = department.ext;
      departmentEntity.name = department.name;
      departmentEntity.parent_id = department.parent_id;


      const dept = await this.dept.findOne({
        where: { dept_id: department.dept_id },
      });

      if (!dept) {
        // 保存部门实体到数据库
        await this.dept.save(departmentEntity);
      }
      // 获取子部门列表
      const subDepartments = await this.getSubDepartments(
        accessToken,
        department.dept_id
      );

      // 递归遍历子部门
      if (subDepartments && subDepartments.length > 0) {
        await this.traverseDepartmentTree(accessToken, subDepartments);
      }
    }
  }
}
