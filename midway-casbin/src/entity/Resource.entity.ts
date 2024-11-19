/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-28 13:24:23
 * @LastEditTime : 2023-06-28 15:25:11
 * @FilePath     : \\midway-project\\src\\entity\\SubjectResource.entity.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2022-08-25 16:45:05
 * @LastEditTime : 2022-08-25 20:03:11
 * @FilePath     : \\server\\src\\entity\\app\\RoleResouce.entity.ts
 */

import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'resource' })
@Index(['name'], { unique: true })
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '资源标识',
    nullable: true,
    type: 'nvarchar',
  })
  name: string;

  @Column({
    comment: '资源路径',
    nullable: true,
    type: 'nvarchar',
  })
  path: string;
  @Column({
    comment: '资源排序',
    nullable: true,
    type: 'nvarchar',
  })
  orderNo: string;
  @Column({
    comment: '图标',
    nullable: true,
    type: 'nvarchar',
  })
  icon: string;
  @Column({
    comment: '资源名称',
    nullable: true,
    type: 'nvarchar',
  })
  title: string;
  @Column({
    comment: '颜色',
    nullable: true,
    type: 'nvarchar',
  })
  color: string;
  @Column({
    comment: '不需要授权',
    nullable: true,
    default: true,
  })
  skipAuthorize: boolean;
  @Column({
    comment: '在面板上显示',
    nullable: true,
    default: true,
  })
  showInPanel: boolean;
}
