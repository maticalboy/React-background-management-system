// 长期保存数据，利用localStorage，但会有浏览器不兼容，用store库
import store from 'store'
const USER_KEY='user_key'
export default{
    // 保存user
    saveUser(user){
        // console.log('已保存')
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    // 读取user
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
        // console.log('已经读取')
        return store.get(USER_KEY)||{}
    },
    // 删除user
    deleteUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}