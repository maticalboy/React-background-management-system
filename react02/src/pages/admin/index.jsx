import React, { useState } from 'react'
import { Navigate ,Route,Routes} from 'react-router-dom'
import { Layout } from 'antd';


import memoryUtils from '../../utils/memoryUtils'
// 引入框架组件
import Header from '../../components/header';
import LeftNav from '../../components/leftNav';
// 引入路由组件
import Category from '../category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Home from '../home'
import Product from '../product'
import Role from '../role'
import User from '../user'
const { Footer, Sider, Content } = Layout;
export default function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const user = memoryUtils.user
    // 没有存储user 当前没有登入
    if (!user || !user._id) {
        // 自动跳转到登入界面,但刷新会返回登入界面，利用本地储存再转给内存解决
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return (
        <Layout style={{ width: '100%', minHeight: '100%' }}>
            <Sider collapsed={collapsed} collapsible={true}>
                <LeftNav />
            </Sider>
            <Layout>
                <Header toggleCollapsed={toggleCollapsed} collapsed={collapsed} user={user}/>
                <Content style={{margin:'20px', backgroundColor:'rgba(255, 255, 255, 0.967)'}}>
                    <Routes>
                        <Route path='/' element={<Navigate to ='home'/>}></Route>
                        <Route path='*' element={<Navigate to='home' />}></Route>
                        <Route path='/category' element= {<Category/> }></Route>
                        <Route path='/charts/bar' element={ <Bar/> }></Route>
                        <Route path='/charts/line' element={ <Line/> }></Route>
                        <Route path='/charts/pie' element={<Pie/>}></Route>
                        <Route path='home' element={<Home/>}></Route>
                        <Route path='product/*' element={<Product/>}></Route>
                        <Route path='role' element={<Role/>}></Route>
                        <Route path='user'element={<User/>}></Route>
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center', color: '#cccc' }}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
            </Layout>
        </Layout>
    )
}
