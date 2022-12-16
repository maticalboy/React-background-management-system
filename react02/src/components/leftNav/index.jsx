import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
// 导入menuitem
import items from '../../config/menuConfig'
import './index.css'
// 导入图标
import logo from '../../assets/imgs/logo.svg';

// 左侧导航组件
export default function LeftNav(props) {
    // 路由路径
    let urlParams = new URL(window.location.href);
    urlParams = new URL(window.location.href);
    let pathname = urlParams?.pathname;
    pathname=pathname.replace('/admin','')
    // console.log("pathname:", pathname,typeof(pathname));
    // 得到需要打开的菜单
    // console.log(items)
    let openItem=items.filter((item)=>{
        if(item.children){
            let itemNeedOpen=item.children.filter((item1)=>{
                return item1.key===pathname
            })
            // console.log('itemneed',itemNeedOpen)
            return itemNeedOpen.length!==0
        }
        else{
            // console.log(item.key)
            return item.key===''
        }
    })

    // console.log('111',openItem.length ? openItem[0].key:'6',typeof(openItem[0].key))
    return (
            <div>
                <Link to='/admin' className='left-nav'>
                    <header className='left-nav-header'>
                        <img src={logo} alt="logo" />
                        <h1>后台系统</h1>
                    </header>
                </Link>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <Menu
                        defaultSelectedKeys={[pathname||'/home']}
                        //selectedKeys={[pathname||'/home']}
                        defaultOpenKeys={[openItem[0] ? openItem[0].key:'']}
                        // openKeys={[openItem[0] ? openItem[0].key:'']}
                        mode="inline"
                        theme="dark"
                        items={items}
                    />
                </div>
            </div>
    )
}
