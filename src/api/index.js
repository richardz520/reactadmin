/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import ajax from './ajax'
import md5 from "md5";


const BASE = 'http://localhost:8080';
const loginUrl = BASE + '/api/sys/login';
// 请求登陆
export const reqLogin = (username, password) => ajax.post(loginUrl, { username, password: md5(password) })