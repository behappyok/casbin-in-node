/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-27 18:26:38
 * @LastEditTime : 2023-10-30 17:44:41
 * @FilePath     : \\app-auth\\src\\config\\config.default.ts
 */
import { MidwayConfig } from '@midwayjs/core';
// import { readFileSync } from 'fs';
// import { join } from 'path';
import { Dept } from '../entity/Dept.entity';
import { Resource } from '../entity/Resource.entity';
import { SubjectResource } from '../entity/SubjectResource.entity';
import { User } from '../entity/User.entity';
const HOST1 = '192.168.1.100';
const HOST2 = '192.168.1.101';
const PWD1 = 'PWD';
const PWD2 = 'PWD2';
const PORT = 7001
const DATABASE = 'application-control2'
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1687861598183_9747',
  koa: {
    globalPrefix: '/api',
    port:PORT,
  },

  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: HOST2,
        port: 3306,
        username: 'root',
        password: PWD2,
        database: DATABASE,
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        // 或者扫描形式
        entities: [Dept, Resource, SubjectResource],
      },
      prod: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: HOST1,
        port: 3306,
        username: 'root',
        password: PWD1,
        database: 'DATABASE',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        // 或者扫描形式
        entities: [User],
      },
    },
  },
  passport: {
    session: false,
  },
  jwt: {
    // secret: readFileSync(join(__dirname, 'p.key')),
    expiresIn: '2d', // https://github.com/vercel/ms
    algorithm: 'RS256',
  },
  redis: {
    // client: {
    //   port: 6379, // Redis port
    //   host: '192.168.1.151', // Redis host
    //   password: 'password',
    //   db: 9,
    // },
    clients: {
      instance1: {
        port: 6379, // Redis port
        host: HOST1, // Redis host
        password: PWD1,
        db: 8,
      },
      instance2: {
        port: 6379, // Redis port
        host: HOST1, // Redis host
        password: PWD1,
        db: 9,
      },
      instance3: {
        port: 6379, // Redis port
        host: HOST1, // Redis host
        password: PWD1,
        db: 7,
      },
    },
  },
  dingtalk: {
    appId: 'dingyepi38ldgkbo9cij',
    appSecret:
      '9tksiZ15ugyszQKd1wrlfZqrU81qincDOqv0pq40abSaq4ZvINPdw3emUPRdiRe4',
  },
} as unknown as MidwayConfig;
