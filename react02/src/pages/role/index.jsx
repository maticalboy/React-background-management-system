import React from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
} from 'antd'
import { useState } from 'react';
import { reqAllRole } from '../../api';
import { useEffect } from 'react';
import AddRole from './add_role';
import UpDataRole from './updataRole';
// 角色管理
export default function Role() {
    // 点的角色数据要保存
    const [role, setRole] = useState({})
    // Table初始数据
    const [dataSource, setDataSource] = useState([
        {
            "menus": [
                "/category",
                "/home"
            ],
            "_id": "5e0d7292bd72914ee8e714d4",
            "name": "测试",
            "auth_time": 1607481252131,
            "auth_name": "admin",
            "create_time": 1554639521749
        },
        {
            "menus": [
                "all",
                "/home",
                "/products",
                "/category",
                "/product",
                "/user",
                "/role",
                "/charts",
                "/charts/bar",
                "/charts/line",
                "/charts/pie"
            ],
            "_id": "5e175a134bce5e36d48fb4db",
            "name": "管理员",
            "create_time": 1578588691768,
            "auth_name": "admin",
            "auth_time": 1578588698490
        },
        {
            "menus": [
                "/home",
                "/charts/bar",
                "/charts",
                "/charts/line",
                "/charts/pie",
                "/role"
            ],
            "_id": "5e188bb874c89321209fedda",
            "name": "员工",
            "create_time": 1578666936202,
            "auth_name": "admin",
            "auth_time": 1607330722391
        },
        {
            "menus": [],
            "_id": "5fcdcb428e518d46807aa485",
            "name": "哈哈哈",
            "create_time": 1607322434116
        },
        {
            "menus": [
                "/category"
            ],
            "_id": "5fcdca798e518d46807aa484",
            "name": "你好",
            "create_time": 1607322233401,
            "auth_time": 1607411041057,
            "auth_name": "admin"
        },
        {
            "menus": [],
            "_id": "5fcdcb528e518d46807aa486",
            "name": "哈哈啊",
            "create_time": 1607322450051
        },
        {
            "menus": [],
            "_id": "5fcdcd638e518d46807aa488",
            "name": "123",
            "create_time": 1607322979807
        },
        {
            "menus": [
                "/home",
                "/products",
                "/category",
                "/product",
                "/charts/pie"
            ],
            "_id": "5e171d55d59eb648d4ed66a8",
            "name": "测试",
            "create_time": 1578573141547,
            "auth_name": "admin",
            "auth_time": 1607406938634
        },
    ]);
    
    // 初始获取数据 ，刷新获取
    const getAllRole = async () => {
        const result = await reqAllRole()
        // console.log(result.data.data)
        setDataSource(result.data.data)
    }
    // 每当打开页面
    useEffect(() => {
        // 获取所有角色
        getAllRole()
    }, [])
    const title = (
        <span>

            <AddRole getAllRole={getAllRole}></AddRole>&nbsp;&nbsp;

            <UpDataRole role={role} getAllRole={getAllRole}></UpDataRole>
        </span>
    )
    // Table 格式
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            // key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            // key: 'create_time',
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            // key: 'auth_time',
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
            // key: 'auth_name',
        },
    ];
    // 解决点击radio不起效果
    const onChange = (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // console.log(selectedRows[0])
        // 更新角色
        setRole(selectedRows[0])
    }
    // 点击某一行
    const onRow = (role) => {
        return {
            onClick: event => {
                // 点击保存数据
                setRole(role)
            }, // 点击行
            onDoubleClick: event => { },
            onContextMenu: event => { },
            onMouseEnter: event => { }, // 鼠标移入行
            onMouseLeave: event => { },
        };
    }

    return (
        <div>
            <Card title={title}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey='_id'
                    pagination={{
                        defaultPageSize: 5
                    }}
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id], onChange: onChange }}
                    onRow={onRow}
                />;
            </Card>
        </div>
    )
}
