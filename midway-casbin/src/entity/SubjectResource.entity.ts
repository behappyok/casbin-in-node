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

@Entity({ name: 'subject-resource' })
@Index(['subjectId', 'resourceCode'], { unique: true })
export class SubjectResource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    comment: '主体备注',
    name: 'subject_mark',
    nullable: true,
    type: 'nvarchar',
  })
  subjectMark: string;
  @Column({
    comment: '主体id',
    name: 'subject_id',
    nullable: true,
    type: 'nvarchar',
  })
  subjectId: string;

  @Column({
    comment: '资源标识',
    name: 'resource_code',
    nullable: true,
    type: 'nvarchar',
  })
  resourceCode: string;
}
