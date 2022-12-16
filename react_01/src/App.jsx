import React, { Component, useState } from 'react'
// 引入路由
import { Link, NavLink } from 'react-router-dom'
// 引入antd 样式
import { Button, Menu, Layout, Input, Dropdown, Space } from 'antd'
import { DownOutlined, MediumOutlined, AppstoreOutlined, MailOutlined, DesktopOutlined, MenuUnfoldOutlined, ContainerOutlined, MenuFoldOutlined, PieChartOutlined, BellOutlined } from '@ant-design/icons'
// 引入App.css
import './App.css'
// 导出基本框架
const { Header, Footer, Sider, Content } = Layout;
// 下拉菜单的引用
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// 左侧导航兰
const items = [
  getItem('首页', '1', <PieChartOutlined />),
  getItem('商品', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('用户管理', '2', <DesktopOutlined />),
  getItem('角色管理', '3', <ContainerOutlined />),
  
  getItem('图形图表', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];
// 上边的人物导航
const menu = (
  <Menu
    items={[
      {
        label: <a href="#">1</a>,
        key: '0',
      },
      {
        label: <a href="#">2nd menu item</a>,
        key: '1',
      },
      {
        label: <a href="#">3th menu item</a>,
        key: '2',
      },
    ]}
  />
);

export default function App() {
  // 获取菜单栏，可否折叠
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <div>
        {/* head */}
        <Layout>
          <Sider className='sider' theme='light' collapsed={collapsed} collapsible={true} collapsedWidth={{ width: 50 }} >
            {/* 左侧标题 */}
            <h1 className='white'><MediumOutlined className='black' />&nbsp; <a href="http://localhost:3000/admin">Shards Dashboards</a> </h1>
            {/* 下拉菜单 */}
            <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, }}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div style={{ width: 200, }}>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                // 折叠问题
                // https://blog.csdn.net/gaoxiaoba/article/details/118341433
                items={items}
              />
            </div>
          </Sider>
          <Layout>
            <Header className='header'>
              <ul className='header_list' >
              <li className="info">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Click me
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </li>
                <li className="search "><a href="#"><Input placeholder="Search for something...." /></a></li>
                <li className="person">
                  <a href="#">
                    <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.825e7f19.F5VW6AkXPajP9jWR8Uzkpw" alt="图片" />
                  </a>
                </li>
                <li className="bell">
                  <a href="#">
                    < BellOutlined className='bell1' />
                    <div className="point">2</div>
                  </a>

                </li>
                
              </ul>


            </Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
        {/* <Button type='primary'><NavLink to='/admin'>App</NavLink></Button>
        <Button type='primary'><NavLink to='/login'>Login</NavLink></Button> 
        <Link to='/admin/products'></Link>
        <Button type='primary'><Link to='/admin/dashboard'>Dashboard</Link></Button>  */}

      </div>

    </div>


  )
}

