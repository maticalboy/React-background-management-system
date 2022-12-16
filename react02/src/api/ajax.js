// 封装axios
// 引入axios
import axios from 'axios'
export default async function ajax(url,data={},type='GET'){
    if(type==='GET'){
        // console.log(data)
        return await axios.get(url,{
            // 配置对象
            params:
                data //指定请求参数
        })
    }else{
        return await axios.post(url,data)
    }
}
// 请求登入接口
// ajax('/login',{username:'Tom',password:'12345'},'POST')
// 添加用户
// ajax('/manage/user/add',{username:'Tom',password:'12345',phone:'13931067842'},'POST')