import { Button } from 'antd';

// 引入本地和内存数据
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
import './App.css';
// 引入路由组件
import {Route,Routes,Navigate} from 'react-router-dom'
// 引入登入页面和操作页面
import Login from './pages/login'
import Admin from './pages/admin';
function App() {
  
  // 读取local中保存的user。保存到内存中memory，更快
  const user=storageUtils.getUser()
  memoryUtils.user=user
  // console.log(user)
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/login'/>}></Route>
      if(memoryUtils.user){
        <Route path='/admin/*' element={<Admin></Admin>}></Route>
      }
      else{
        <Route path='/login' element={<Login></Login>}></Route>
      }
      <Route path='/admin/*' element={<Admin></Admin>}></Route>
    </Routes>
  )
}
export default App