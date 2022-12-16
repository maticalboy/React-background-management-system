import { Space, Table, Button } from 'antd';
import React from 'react';
import { useLayoutEffect,useEffect } from 'react';
import { useState } from 'react';
import { reqCategory } from '../../api';
import './index.css'



export default function Tables(props) {
    // 设置loading状态
    const [loading, setLoading] = useState(false)
    // 设置父级分类ID,名称
    const [parentId, setParentId] = useState('0')//分类标识
    const [parentName, setParentName] = useState('')
    const [_id, set_id] = useState('0')//自身的id
    // 获取商品列表
    const [category, setCategory] = useState([])//一级列表
    const [secCategory, setSecCategory] = useState([])//二级列表
    

    // 返回更新一级列表
    useLayoutEffect(() => {
        if (props.init === 1) {
            setSecCategory([])//二级列表设置为空
            set_id('0')//设置初始状态
            setParentId('0')
            setParentName('')
        }
    }, [props.init])// eslint-disable-line


    // 初始申请一级列表
    useLayoutEffect(() => {
        // 申请一级列表
        const fetchData1 = async () => {
            const result = await reqCategory(0)
            // console.log(result)
            if (result.data.status === 0) {
                setLoading(true)
            }
            setCategory(result.data.data)
        }
        fetchData1()
    }, [])// eslint-disable-line


    // 修改商品种类信息
    const revise = (id, name, _id) => {
        props.setAddOrReq(1)
        // 展示框框
        // console.log(id, name, _id)
        // 查看是修改那个菜单及的
        if(id===0){     //一级菜单
            props.setForm(0)
        }
        else{           //二级菜单
            props.setForm(1)
        }
        // showSec(id, name, _id)//更新下拉菜单里的数据
        // 申请二级列表
        const fetchData2 = async () => {
            const result = await reqCategory(id)
            setSecCategory(result.data.data)
        }
        fetchData2()
    }


    // 检测AddOrReq
    useEffect(() => {
        // console.log(props.addOrReq)
        if (props.addOrReq === 1) {
            // 展示框框
            props.setIsModalVisible(true)
            // console.log('revise', props.addOrReq)
        }
    }, [props.addOrReq])// eslint-disable-line


    // 展示二级列表
    const showSec = (id, name, _id) => {
        // 申请二级列表
        const fetchData2 = async () => {
            const result = await reqCategory(_id)
            // console.log('id',_id)
            if (result.data.status === 0) {
                // 异步操作，不能及时更新数据，用effect监听
                if (_id !== '0' && _id !== undefined) {
                    setParentName(name)
                    setParentId(id)
                    set_id(_id)
                }

                // console.log(parentId,parentName)
            }
            setSecCategory(result.data.data)
        }
        fetchData2()
    }


    // 检测父级id和name
    useLayoutEffect(() => {
        // console.log('检测', parentId, parentName)
        props.getTitle(parentId, parentName)
    }, [parentName])// eslint-disable-line


    
    // 将数据传递给category,同步一级菜单数据
    useLayoutEffect(() => {
        props.acceptCatGory(category)
    }, [category])// eslint-disable-line


    // 添加 -》更新一级菜单，重新加载获取
    useLayoutEffect(() => {
        if (props.isUpDataFirst === 1) {
            // 申请一级列表
            // console.log('更新一级菜单')
            const fetchData1 = async () => {
                const result = await reqCategory(0)
                // console.log(result)
                if (result.data.status === 0) {
                    setLoading(true)
                }
                setCategory(result.data.data)
            }
            fetchData1()
            //复0
            props.setIsUpDataFirst(0)
        }
    }, [props.isUpDataFirst])// eslint-disable-line
    

    // 将数据传递给secCategory,同步二级菜单数据
    useLayoutEffect(() => {
        props.accept2(secCategory)
    }, [secCategory])// eslint-disable-line


    
    // 数据
    const columns = [
        {
            title: '分类的名字',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            width: '300px',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className='action'>
                    <Button type="link" onClick={() => { revise(record.parentId, record.name, record._id) }}>修改{record.name}</Button>
                    {
                        _id === '0' ?//是否是初始菜单
                            <Button type="link" onClick={() => { showSec(record.parentId, record.name, record._id) }}>查看子分类</Button>
                            : null
                    }
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table
                loading={!loading}
                dataSource={_id === '0' ? category : secCategory}
                columns={columns}
                bordered
                rowKey={'_id'}
                pagination={
                    { defaultPageSize: 5, showQuickJumper: true }
                } />;
        </div>

    )
}