import { Button, Modal, Form, Input, Row,Col,} from 'antd';
import React, { useState } from 'react';
import { reqAddRole, reqAllRole } from '../../../api';

export default function AddRole(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    // 提交表单
    const handleOk = async (values) => {
        setIsModalOpen(false);
        // 获取输入的内容
        const {roleName}=values
        
        // 发送添加请求
        const result=await reqAddRole(roleName)

        // console.log(result.data.data)
        // 更新表单
        props.getAllRole()

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                添加角色
            </Button>
            <Modal title="Add Role" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen} footer={null}>
                <Form
                    name="wrap"
                    labelCol={{
                        flex: '110px',
                    }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{
                        flex: 1,
                    }}
                    colon={false}
                    onFinish={handleOk}
                >
                    <Form.Item
                        label="正常标签文案"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Row >
                            <Col span={6} offset={6}>
                                <Button type="primary" htmlType="submit" >
                                    确认
                                </Button>
                            </Col>
                            <Col span={6} offset={4}>
                                <Button onClick={handleCancel}>
                                    取消
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}