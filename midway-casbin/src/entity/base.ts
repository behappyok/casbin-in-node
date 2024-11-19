/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-28 13:25:11
 * @LastEditTime : 2023-06-28 13:25:11
 * @FilePath     : \\midway-project\\src\\entity\\base.ts
 */

import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    nullable: true,
  })
  createTime: string;
  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    nullable: true,
  })
  updateTime: string;
  @Column({
    name: 'create_by',
    nullable: true,
  })
  createBy: string;
  @Column({
    name: 'update_by',
    nullable: true,
  })
  updateBy: string;
}
