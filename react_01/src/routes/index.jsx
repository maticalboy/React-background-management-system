import { Routes, Route ,Navigate} from 'react-router-dom';

//引入路由组件
import Login from '../pages/Login'
import Dashboard from '../pages/admin/Dashboard'
import Edit from '../pages/admin/products/Edit'
import List from '../pages/admin/products/List'
import NotFind from '../pages/NotFind'
export default function Rout() {
    return (
        <Routes>
            {/* 其余页面 */}
            {/* <Route path='products/*' element={<Navigate to='/admin/products/Edit'/>}></Route>
            <Route path='/Dashboard' element={<Dashboard />}></Route>
            <Route path='/Edit' element={<Edit />}></Route>
            <Route path='/List' element={<List />}></Route> */}

            {/* 登入界面和404界面 */}
            {/* <Route path='/login' element={<Login />}></Route> */}
            <Route path='/404' element={<NotFind />}></Route>
        </Routes>
    )
}