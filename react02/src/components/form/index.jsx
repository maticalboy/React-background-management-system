import React from 'react'
import {
    Form,
    Input,
    Select,
} from 'antd';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
const { Option } = Select;

export default function Forms(props) {
    const [addOrReq, seta] = useState()
    useLayoutEffect(() => {
        // console.log('form',props.addOrReq)
        seta(props.addOrReq)
    }, [props.addOrReq])
    // console.log(props)//传入标记Form ref;onfinish关联modal和form;数据数组;添加还是修改，一级菜单还是二级菜单
    if (addOrReq === 0)//添加
        return (
            <Form
                ref={props.formRef}
                onFinish={props.onFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}>
                <Form.Item
                    name="level"
                    label="级别"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please select your country!',
                        },
                    ]}
                >
                    <Select placeholder="Please select a country">
                        <Option key={'111'} value="0">一级列表</Option>
                        {props.category.map(item => {
                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="种类名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form>
        )
    else {
        return (
            <Form
                ref={props.formRef}
                onFinish={props.onFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}>
                <Form.Item
                    name="level"
                    label="级别"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please select your country!',
                        },
                    ]}
                >
                    <Select placeholder="Please select a country">
                        
                    {           props.Form === 0 ? 
                        ((<Option key={'111'} value="0">一级列表</Option>)
                        (props.category.map(item => {
                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                        }))):
                        (props.secCategory.map(item => {
                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                        }))
                    }

                    </Select>
                </Form.Item>
                <Form.Item
                    label="要修改成的种类名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form>
        )
    }
}
