import storageUtils from "./storageUtils"

// 初始时取一次并保存为user
let user = storageUtils.getUser()
export default {
    user, // 用来存储登陆用户的信息, 初始值为local中读取的user
    removeUser() {
        storageUtils.removeUser();
        user = {}
    }
}