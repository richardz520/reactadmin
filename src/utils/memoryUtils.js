import storageUtils from "./storageUtils"


let user = storageUtils.getUser()
export default {
    user,
    removeUser() {
        storageUtils.removeUser();
        user = {}
    }
}