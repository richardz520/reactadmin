/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import ajax from './ajax'
import md5 from "md5";


const BASE = 'http://localhost:8080';
const loginUrl = BASE + '/api/sys/login';
const menuAddUrl = BASE + '/api/sys/menu/add';
const menuListUrl = BASE + '/api/sys/menu/list';
const menuDeleteUrl = BASE + '/api/sys/menu/delete';
const menuDetailUrl = BASE + '/api/sys/menu/detail';
const menuUpdateUrl = BASE + '/api/sys/menu/update';
const roleAddUrl = BASE + '/api/sys/role/add';
const roleListUrl = BASE + '/api/sys/role/list';
const roleDeleteUrl = BASE + '/api/sys/role/delete';
const roleDetailUrl = BASE + '/api/sys/role/detail';
const roleUpdateUrl = BASE + '/api/sys/role/detail';
// 请求登陆
export const reqLogin = (username, password) => ajax.post(loginUrl, { username, password: md5(password) });
//添加菜单
export const reqMenuAdd = (values) => ajax.post(menuAddUrl, {
    title: values.title,
    path: values.path,
    component: values.component,
    sort: values.sort,
    icon: values.icon,
    pid: values.pid,
    remark: values.remark
});
//菜单列表
export const reqMenuList = () => ajax.post(menuListUrl, {});
//删除菜单
export const reqMenuDelete = (id) => ajax.post(menuDeleteUrl, { id: id });
//查询菜单详情
export const reqMenuDetail = (id) => ajax.post(menuDetailUrl, { id: id });
//修改菜单
export const reqMenuUpdate = (values) => ajax.post(menuUpdateUrl, {
    id: values.id,
    title: values.title,
    path: values.path,
    component: values.component,
    sort: values.sort,
    icon: values.icon,
    pid: values.pid,
    remark: values.remark
});
//添加角色
export const reqRoleAdd = (name, remark, menuIds) => ajax.post(roleAddUrl, { name: name, remark: remark, menuIds: menuIds });
//角色列表
export const reqRoleList = () => ajax.post(roleListUrl, {});
//删除角色
export const reqRoleDelete = (id) => ajax.post(roleDeleteUrl, { id: id });
//查询角色详情
export const reqRoleDetail = (id) => ajax.post(roleDetailUrl, { id: id });
//更新角色
export const reqRoleUpdate = (id, name, remark, menuIds) => ajax.post(roleAddUrl, { id: id, name: name, remark: remark, menuIds: menuIds });