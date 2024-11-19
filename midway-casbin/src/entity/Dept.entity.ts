/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-07-03 10:22:18
 * @LastEditTime : 2023-07-03 11:41:59
 * @FilePath     : \\midway-project\\src\\entity\\Dept.entity.ts
 */

import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'dept' })
@Index(['dept_id'], { unique: true })
export class Dept extends BaseEntity {
  @PrimaryColumn({ generated: 'increment' })
  id: number;
  @Column({
    comment: '部门ID',
    nullable: true,
    type: 'bigint',
  })
  dept_id: string;

  @Column({
    comment: '部门名称',
    nullable: true,
    type: 'nvarchar',
  })
  name: string;

  @Column({
    comment: '父级ID',
    nullable: true,
    type: 'bigint',
  })
  parent_id: string;

  @Column({
    comment: '其他信息',
    nullable: true,
    type: 'nvarchar',
  })
  ext: string;

  @Column({
    comment: '其他信息',
    nullable: true,
  })
  create_dept_group: boolean;

  @Column({
    comment: '其他信息',
    nullable: true,
  })
  auto_add_user: boolean;
}
