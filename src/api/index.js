/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import ajax from './ajax'
import md5 from "md5";


const BASE = 'http://localhost:8080';
const loginUrl = BASE + '/api/sys/login';
const addMenuUrl = BASE + '/api/sys/menu/add';
const menuListUrl = BASE + '/api/sys/menu/list';
const deleteMenuUrl = BASE + '/api/sys/menu/delete';
// 请求登陆
export const reqLogin = (username, password) => ajax.post(loginUrl, { username, password: md5(password) });
//添加菜单
export const reqAddMenu = (values) => ajax.post(addMenuUrl, {
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
export const reqDeleteMenu = (id) => ajax.post(deleteMenuUrl, { id: id });