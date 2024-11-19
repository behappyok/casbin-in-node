/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:26:38
 * @LastEditTime : 2023-06-30 12:24:21
 * @FilePath     : \\midway-project\\src\\config\\config.local.ts
 */
import { MidwayConfig } from '@midwayjs/core';
export default {
  koa: {
    globalPrefix: '/api',
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: '192.168.1.100',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'application-control-dev',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        // 或者扫描形式
        entities: ['**/entity/**/*.entity{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
