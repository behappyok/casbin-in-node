/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-07-03 10:22:18
 * @LastEditTime : 2023-07-03 11:41:59
 * @FilePath     : \\midway-project\\src\\entity\\Dept.entity.ts
 */

import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity({ name: 'sys_user_info' })
@Index(['id'], { unique: true })
export class User {
  @PrimaryColumn()
  id: string;
  @Column({
    comment: '部门ID',
    nullable: true,
    type: 'bigint',
  })
  dingtalk_dept_id: string;

  @Column({
    comment: '姓名',
    nullable: true,
    type: 'nvarchar',
  })
  user_name: string;
  @Column({
    comment: '头像',
    nullable: true,
    type: 'nvarchar',
  })
  avatar: string;
}
