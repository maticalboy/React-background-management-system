// 进一步封装接口
import ajax from './ajax'
// 登入
export async function reqLogin(username, password) {
    return await ajax('/login', {
        username,
        password
    }, 'POST')
}
// 添加用户
export async function reqAddUser(user) {
    return await ajax('/manage/user/add', user, 'POST')
}
export async function getWeather(data){
    return await ajax('https://restapi.amap.com/v3/weather/weatherInfo',data,'GET')
}
// 天气
// export const gaoDeWeather = async () => {
//     const res = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=234e06465507fad793f681f3d494df70&city=420100&extensions=all')
//     console.log(res)
// }
// 获取分类的列表
export async function reqCategory(parentId){
    return await ajax('/manage/category/list',{parentId},'GET')
}
// 添加分类
export async function reqAddCategory(parentId,categoryName){
    return await ajax('/manage/category/add',{parentId,categoryName},'POST')
}
// 更新分类
export async function reqUpdateCategory(categoryId,categoryName){
    return await ajax('/manage/category/update',{categoryId,categoryName},'POST')
}

// 查看商品列表
export async function reqProduct(pageNum,pageSize){
    return await ajax('/manage/product/list',{pageNum,pageSize},'GET')
}
// 按照desc查找商品列表
export async function reqSearchByDesc(pageNum=1,pageSize,productDesc){
    return await ajax('/manage/product/search',{pageNum,pageSize,productDesc},'GET')
}
// 按照name查找商品列表
export async function reqSearchByName(pageNum=1,pageSize,productName){
    return await ajax('/manage/product/search',{pageNum,pageSize,productName},'GET')
}
// 获取分类名称
export async function reqCategoryName(categoryId){
    return await ajax('/manage/category/info',{categoryId},'GET')
}
// 修改商品状态
export async function reqState(productId,status){
    return await ajax('/manage/product/updateStatus',{productId,status},'POST')
}
// 更新商品
export async function reqUpdate(_id,categoryId,pCategoryId,name,desc,price,detail,imgs){
    return await ajax('/manage/product/update',{_id,categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')
}
// 上传图片
export async function reqUpLoadImg(image){
    return await ajax('/manage/img/upload',{image},'POST')
}
// 删除图片
export async function reqDeleteImg(name){
    return await ajax('/manage/img/delete',{name},'POST')
}
// 获取所有角色的列表
export async function reqAllRole(){
    return await ajax('/manage/role/list')
}
// 添加角色
export async function reqAddRole(roleName){
    return await ajax('/manage/role/add',{roleName},'POST')
}
// 更新角色信息
export async function reqUpdateRole(_id,menus,auth_time,auth_name){
    return await ajax('/manage/role/update',{_id,menus,auth_time,auth_name},'POST')
}