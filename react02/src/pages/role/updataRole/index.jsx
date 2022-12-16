import { Tree, Button, Modal, } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqUpdateRole } from '../../../api';

const UpDataRole = (props) => {
    // 先去更新角色的默认选择树节点
    useEffect(()=>{
        console.log("menus"+props.role.menus)
        setCheckedKeys(props.role.menus)
    },[props.role])
    const [treeData, setTreeData] = useState([
        {
            title: '平台权限',
            key: 'all',
            children: [
                {
                    title: '首页',
                    key: '/home',
                },
                {
                    title: '商品',
                    key: '/products',
                    children: [
                        {
                            title: '品类管理',
                            key: '/category',
                        },
                        {
                            title: '商品管理',
                            key: '/product',
                        },
                    ],
                },
                {
                    title: '用户管理',
                    key: '/user',
                },
                {
                    title: '角色管理',
                    key: '/role',
                },
                {
                    title: '图形图表',
                    key: '/charts',
                    children: [
                        {
                            title: '柱形图',
                            key: '/charts/bar',
                        },
                        {
                            title: '折线图',
                            key: '/charts/line',
                        },
                        {
                            title: '饼图',
                            key: '/charts/pie',
                        },
                    ],
                },
            ],
        },
    ])
    const [expandedKeys, setExpandedKeys] = useState(['/products', '/charts','all']);//展开的树节点
    const [checkedKeys, setCheckedKeys] = useState([]);//选中复选框的树节点
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };
    // 头样式
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 是否显示
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk =async () => {
        setIsModalOpen(false);
        // 获取选择的keys
        // checkedKeys
        // 获取_id，auth_name auth_time
        const result=await reqUpdateRole(props.role._id,checkedKeys,props.role.auth_time,props.role.auth_name="admin")
        // console.log(result.data.data)
        props.getAllRole()//更新所有用户信息

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type='primary' disabled={!props.role._id} onClick={showModal}>设置角色权限</Button>

            <Modal title="UpData Role" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} visible={isModalOpen}>
                角色权限：<input style={{ width: '50%' }} type="text" disabled value={props.role.name} />
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={treeData}
                />
            </Modal>
        </>


    );
};

export default UpDataRole;