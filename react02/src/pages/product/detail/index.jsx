import React, { useEffect } from 'react'
import { List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_IMG_URL } from '../../../utils/constants';
import { reqCategoryName } from '../../../api';
export default function Detail() {
    // 接取值
    const location = useLocation()
    // const { state } = location
    // console.log(location, state.name);
    useEffect(() => {
        const { state } = location
        // console.log(location, state);
        setName(() => {
            const { name } = state
            return name
        })//更新名字
        setDesc(() => {
            const { desc } = state
            return desc
        })//更新描述
        setPrice(() => {
            const { price } = state
            return price
        })//更新价格
        setDetail(() => {
            const { detail } = state
            // console.log('456',detail)
            return detail
        })//更新详情
        setPicture(() => {
            const picture = state.img
            // console.log(picture)
            return picture
        })//更新图片
        setCategory(
            async () => {
                //由于会返回一个promise对象，无法将一个promise对象设置为返回值，故借助中间变量results获取promise对象里的值，再返回给category
                let result1
                let result2
                const { categoryId, pCategoryId } = state
                const fun = async () => {
                    result1 = await reqCategoryName(categoryId)
                    result2 = await reqCategoryName(pCategoryId)
                    return (result2.data.data.name + '->' + result1.data.data.name)
                }//获取promise对象
                // fun().then((result) => {
                //     setResults(result)//先返回给results
                // })
                const result=await fun()
                setResults(result)//先返回给results
            })
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    // 返回
    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }
    const [name, setName] = useState('娃哈哈')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(16)
    const [picture, setPicture] = useState([])
    const [detail, setDetail] = useState('')
    const [category, setCategory] = useState('')
    const [results, setResults] = useState('')
    useEffect(() => {
        setCategory(results)
    }, [results])// eslint-disable-line react-hooks/exhaustive-deps
    const data = [

        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>商品名称:</span>
            <span>{name}</span>
        </div>),
        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>商品描述:</span>
            <span>{desc}</span>
        </div>),
        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>商品价格:</span>
            <span>{price}</span>
        </div>),
        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>所属分类:</span>
            <span>{category}</span>
        </div>),
        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>商品图片:</span>
            {
                picture.map(img => (
                    <img key={img} style={{ width: '100px', height: '100px' }} src={BASE_IMG_URL + img} alt="这是一个图片" />
                ))
            }

        </div>),
        (<div>
            <span style={{ fontSize: '20px', color: '#9A95AF' }}>商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: JSON.parse(JSON.stringify(detail)) }}></span>
        </div>),
    ];
    const header = (
        <div>
            <ArrowLeftOutlined style={{ fontSize: '30px', color: '#CAEABB' }} onClick={back} />
            <span style={{ marginLeft: '25px', fontSize: '25px' }}>商品详情</span>
        </div>
    )
    return (
        <div>
            <List
                size="large"
                header={header}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}
