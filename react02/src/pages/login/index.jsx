import React from 'react'
import {Navigate,useNavigate } from 'react-router-dom'
import logo from '../../assets/imgs/logo.svg';
// 引入antd组件
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './login.css'
import { reqAddUser, reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
export default function Login() {
    const navigate=useNavigate()
    // 先看是否是登入状态，如果已经登入，直接跳转到admin界面
    if(storageUtils.getUser().username){
        // console.log('存在',memoryUtils.user)
        // 跳转到管理页面
        return <Navigate to='/admin' replace={true}></Navigate>
    }
    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        const { username, password } = values
        try {
            const result = await reqLogin(username, password)
            // console.log('3', result.data)
            if (result.data.status === 0) {
                message.success('登入成功')
                // 跳转到管理页面
                navigate('/admin', { replace: true })
                // 保存user到内存
                const user = result.data.data
                memoryUtils.user = user  //保存到内存，但刷新会失效
                // 保存user到localstorage
                // console.log(user)
                storageUtils.saveUser(user)//保存到local中
            }
            else {
                // 发送信息的错误
                console.log('账号密码不正确')
                message.error(result.data.msg)
            }
        } catch (error) {
            // 请求错误
            console.log('错误', error.message)
        }

    };
    const checkPwd = (rule, value) => {
        if (!value) {
            return Promise.reject("密码不能为空")
        } else if (!/^[0-9a-zA-Z_]{1,}$/.test(value)) {
            return Promise.reject('由字母,数字,下划线组成')
        } else if (!/^\w{4,16}$/.test(value)) {
            return Promise.reject('密码由4-16位组成')
        } else {
            return Promise.resolve()
        }
    }
    const checkCon = (rule, value) => {
        if (!value) {
            return Promise.reject("账号不能为空")
        } else if (!/^[0-9a-zA-Z_]{1,}$/.test(value)) {
            return Promise.reject('由字母,数字,下划线组成')
        } else if (!/^\w{4,16}$/.test(value)) {
            return Promise.reject('账号由4-16位组成')
        } else {
            return Promise.resolve()
        }
    }
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="" />
                <h1>后台管理系统</h1>
            </header>
            <section className='login-content'>
                <h2>用户登入</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                validator: checkCon
                            }
                            // {
                            //     required: true,
                            //     message: 'Please input your Username!',
                            // },
                            // {
                            //     required: false,
                            //     min: 4, max: 12, message: '4-12位',
                            // },
                            // {
                            //     required: false,
                            //     pattern: /^[0-9a-zA-Z_]{1,}$/, message: '只能输入数字,字母,下划线'
                            // }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: checkPwd
                            },
                            // {
                            //     required: true,
                            //     message: 'Please input your Password!',
                            // },
                            // {
                            //     required: false,
                            //     min: 4, max: 12, message: '密码4-12位',
                            //     validateFirst: true
                            // },
                            // {
                            //     required: false,
                            //     pattern: /^[0-9a-zA-Z_]{1,}$/, message: '只能输入数字,字母,下划线',

                            // }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox checked>保存账户</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登入
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}
