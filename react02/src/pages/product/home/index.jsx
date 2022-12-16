import React from 'react'
import { Card, Select, Input, Button, Table, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react';
import { reqProduct, reqSearchByDesc, reqSearchByName, reqState } from '../../../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const { Option } = Select;


export default function Home() {
    const navigate = useNavigate()
    let searchContent = useRef(null)//定义搜索内容
    const [products, setProducts] = useState([])//定义商品数组
    const [dataSource, setDataSource] = useState([
        {
            "status": 2,
            "imgs": [
                "1578588737108-index.jpg"
            ],
            "_id": "5e12b97de31bb727e4b0e349",
            "name": "联想ThinkPad 翼4809",
            "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
            "price": 6300,
            "pCategoryId": "5e12b8bce31bb727e4b0e348",
            "categoryId": "5fc74b650dd9b10798413162",
            "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"></span></p>\n",
            "__v": 0
        },
        {
            "status": 1,
            "imgs": [
                "image-1559402448049.jpg",
                "image-1559402450480.jpg"
            ],
            "_id": "5e12b9d1e31bb727e4b0e34a",
            "name": "华硕(ASUS) 飞行堡垒",
            "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
            "price": 6799,
            "pCategoryId": "5e12b8bce31bb727e4b0e348",
            "categoryId": "5fc74b650dd9b10798413162",
            "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
            "__v": 0
        }
    ])//初始默认商品数组
    const [total, setTotal] = useState(0)//商品总数
    const [loading, setLoading] = useState(false)//加载状态
    const [searchSelect, setSearchSelect] = useState('desc')//按照什么搜索
    const [searchKey, setSearchKey] = useState('')//搜索的关键字
    const [pageNumbers, setPageNumbers] = useState(1)//定义页数
    const [value, setValue] = useState('desc')//select的缓存空间，任意值，起一个缓存作用
    // 获取某一页数据
    const getProduct = async (pageNumber) => {
        setLoading(true)//加载loading
        const result = await reqProduct(pageNumber, 7)
        // console.log(result.data.data)
        const { total } = result.data.data
        setProducts(result.data.data.list)//异步
        setTotal(total)//异步
    }
    // 初始获取商品第一页列表
    useEffect(() => {
        getProduct(1)
    }, [])
    // 检测商品列表会更新DataSource
    useEffect(() => {
        setLoading(false)//关闭loading
        setDataSource(products)//更新数据
    }, [products])
    // 按desc需查找
    const search = async (pageNumber) => {
        setPageNumbers((pageNumbers) => {// 获取页数
            return pageNumber
        })//异步
        setSearchKey((searchKey) => {
            let content = searchContent.current.input.value// 获取文本框的内容
            return content
        })//异步
        setSearchSelect((searchSelect) => { //获取选择要求
            return value
        })//异步
    }
    // 检测searchKey,pageNumbers,searchSelect变化
    useEffect(() => {
        // 按照desc查找
        if (searchSelect === 'desc') {
            async function fetch() {
                const result = await reqSearchByDesc(pageNumbers, 7, searchKey)
                setProducts(result.data.data.list)
                setTotal(result.data.data.total)
                // console.log('search,data-byDesc', result.data)
            }
            fetch()
        }
        // 按照name查找
        else {
            async function fetch() {
                const result = await reqSearchByName(pageNumbers, 7, searchKey)
                setProducts(result.data.data.list)
                setTotal(result.data.data.total)
                // console.log('search,data-byName', result.data)
            }
            fetch()
        }
    }, [searchKey, pageNumbers, searchSelect])
    // select改变时1
    const onChange = (value) => {
        setValue((data) => {
            return value
        })
    };
    // select改变时2
    const onSearch = (value) => {
        console.log('search:', value);
    };
    // 点击详情
    const detail = (e) => {
        console.log('products', e)
        // 传递商品详情
        navigate('/admin/product/detail',
            {
                state:
                {
                    name: e.name,
                    desc: e.desc,
                    price: e.price,
                    detail: e.detail,
                    img: e.imgs,
                    categoryId: e.categoryId,
                    pCategoryId: e.pCategoryId
                }
            })
    }
    // 点击下架,或者下架
    const upDataState = (id, state) => {
        reqState(id, state)
        // 更新商品信息
        getProduct(pageNumbers)
    }
    // 点击更新商品
    const upData = (e) => {
        navigate('/admin/product/updata',
            {
                state:
                {
                    name: e.name,
                    desc: e.desc,
                    price: e.price,
                    detail: e.detail,
                    img: e.imgs,
                    _id:e._id,
                    categoryId: e.categoryId,
                    pCategoryId: e.pCategoryId
                }
            })
    }
    // add添加商品信息
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const title = (
        <div>
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
                <Option value="name">按名称查找</Option>
                <Option value="desc">按描述查找</Option>
            </Select>
            <Input placeholder="Basic usage" style={{ width: '145px', marginLeft: '25px', marginRight: '25px' }} ref={searchContent} />
            <Button type='primary' onClick={() => { return search(1) }}>搜索</Button>
        </div>

    )
    const extra = (
        <div>
            <Button type='primary' onClick={upData}>
                <PlusOutlined />
                添加商品
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    )
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',

        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => {
                return '$' + price
            }
        },
        {
            width: 100,
            title: '状态',
            dataIndex: 'status',
            render: (status, _id) => {
                if (status === 1)
                    return (
                        <span>
                            <Button type='primary' onClick={() => { return upDataState(_id, 2) }}>下架</Button>
                            <span>在售</span>
                        </span>
                    )

                else
                    return (
                        <span>
                            <Button type='primary' onClick={() => { return upDataState(_id, 1) }}>上架</Button>
                            <span>已下架</span>
                        </span>
                    )
            }
        },
        {
            width: 100,
            title: '操作',
            render: (product) => {
                return (
                    <span>
                        <Button type='link' onClick={() => { return detail(product) }}>详情</Button>
                        <Button type='link' onClick={() => { return upData(product) }}>修改</Button>
                    </span>
                )
            }
        },
    ];
    return (
        <div>
            <Card
                title={title}
                extra={extra}
                style={{
                    width: '100%',
                }}
            >
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize: 7,
                        total,
                        showQuickJumper: true,
                        onChange: (pageNumber) => {
                            getProduct(pageNumber)
                            search(pageNumber)
                        }
                    }}

                />;
            </Card>
        </div>
    )
}
