import { Model, newEnforcer, StringAdapter } from 'casbin';
import { DataSource } from 'typeorm';
require('dotenv').config();
const modelStr = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub,obj, act

[role_definition]
g = _, _


[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub)  && keyMatch(r.obj,p.obj) &&  keyMatch(r.act ,p.act) || r.sub == "admin" || r.sub == "orgAdmin"
`;

const policyStr = `
p,user,/dictionary/*,get
p,user,/dictionary-item/*,get
p,orgMember,/org/*,get
p,projectGuest,/project/*,get
p,projectAdmin,/project/*,*
g,projectGuest,orgMember
g,projectAdmin,projectGuest
g,orgAdmin,projectAdmin
`;


const model = new Model();
model.loadModelFromText(modelStr);
const adapter = new StringAdapter(policyStr);

export class AuthzService {
    enforcer;
  
    async getEnforcer() {
        if (!this.enforcer) {
            this.enforcer = await newEnforcer(model, adapter);
        }
        return this.enforcer;
    }

    async checkPermissionForRoles(roleCodes, resource, action) {
        const enforcer = await this.getEnforcer();
        let hasPermission = false;
        for (const roleCode of roleCodes) {
            const checkResult = await enforcer.enforce(roleCode, resource, action);
            if (checkResult) {
                hasPermission = true;
                break;
            }
        }
        return hasPermission;
    }

    async checkPermission(roleCodes, resource, action) {
        const allow = await this.checkPermissionForRoles(roleCodes, resource, action.toLowerCase());
        return allow;
    }

    async getPermissionResult(operates, roleCodes) {
        const permissionMap: { [key: string]: boolean } = {};

        for (let i = 0; i < operates.length; i++) {
            const operate = operates[i];
            const semicolonIndex = operate.lastIndexOf(':');
            let action, resource;
            if (semicolonIndex === -1) {
                action = '*';
                resource = operate;
            } else {
                resource = operate.slice(0, semicolonIndex);
                action = operate.slice(semicolonIndex + 1);
            }
            const hasPermission = await this.checkPermissionForRoles(roleCodes, resource, action);
            permissionMap[operate] = hasPermission;
        }

        return permissionMap;
    }
}

const env=process.env
 
const dataSource = new DataSource({
    type: 'mysql',
    host: env.HOST,
    port: 3306,
    username: env.USER, 
    password: env.PASSWORD,
    database: env.DATABASE, 
});

async function getRoleCodes({ userId, departmentId }): Promise<any[]> {
    await dataSource.initialize();
    const recursicveQuerySql = `
       select code from user_role left join role on role.id=user_role.role_id where  user_id='${userId}'
       and department_id='${departmentId}' or department_id is null or department_id in (       
            with recursive temp   as (
                    select *   from department_tree d where d.uid ='${departmentId}'
                    union all
                    select d.* from department_tree d ,temp t WHERE t.pid = d.uid
            )  select pid from temp
        )         
        `;
    const records = await dataSource.query(recursicveQuerySql);
    return records
}

const context = { userId: `xxxx-xxx-xx-xx-xxxx`, departmentId: `xxxx-xxx-xxx-xxx-xxx`,path:'/api/project/1',method:'post'};
const globalPrefix = '/api'
const resource = context.path.replace(globalPrefix,'')
const action = context.method.toLowerCase()

getRoleCodes(context).then(res => {
    const roleCodes = res.map(x => x['code']);
    const authzService = new AuthzService();
    authzService.checkPermission(roleCodes,resource ,action);
});

