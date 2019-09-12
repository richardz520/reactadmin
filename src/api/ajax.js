/* 
封装的能发ajax请求的函数, 向外暴露的本质是axios
1. 解决post请求携带参数的问题: 默认是json, 需要转换成urlencode格式
2. 让请求成功的结果不再是response, 而是response.data的值
3. 统一处理所有请求的异常错误
*/
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// 添加请求拦截器: 让post请求的请求体格式为urlencoded格式 a=1&b2
axios.interceptors.request.use(function(config) {
    const { method, data } = config
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        config.data = qs.stringify(data)
    }
    return config
})

axios.interceptors.response.use(function(response) {
    return response.data
}, function(error) {
    message.error('请求出错 ' + error.message)
    return new Promise(() => {})
});


export default axios