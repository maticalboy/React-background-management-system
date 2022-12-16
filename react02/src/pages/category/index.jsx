import React from 'react'
import { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import Tables from '../../components/table'
import { reqUpdateCategory, reqAddCategory } from '../../api';
import Forms from '../../components/form';
import { useLayoutEffect } from 'react';

// 商品分类
export default function Category() {
  const formRef = React.createRef();
  // 添加和更新
  //是否更新第一个菜单
  const [isUpDataFirst, setIsUpDataFirst] = useState(0)
  //是否更新第二个菜单
  const [isUpDataSec, setIsUpDataSec] = useState(0)
  // 设置添加还是修改的标志
  const [addOrReq, setAddOrReq] = useState(0)//0 添加，1修改
  const [category, setCategory] = useState([])//一级菜单
  const [secCategory, setSecCategory] = useState([])//二级列表
  
  // 查看form时第一个彩蛋还是第二个彩蛋
  const [form,setForm]=useState(0)//默认是一级菜单

  // 更新
  // 要修改的名字和id
  const [needReq, setNeedReq] = useState({})
  const [init, setInit] = useState(0)//默认不初始化

  // 提交
  const onFinish = async (values) => {
    // formRef.current?.getFieldsValue() 的值即为 form 表单中的数据
    // console.log('Success:', formRef.current?.getFieldsValue());
    if (addOrReq === 0) {
      // 发送添加请求
      const { level, name } = formRef.current?.getFieldsValue()
      // console.log(level,name)
      reqAddCategory(level, name)
      if (level === '0') {
        // console.log('起始更新')//测试成功
        // 更新一级菜单
        setIsUpDataFirst(1)
      }
      else {
        // console.log('起始更新2')
        // 更新对应的二级菜单
        setIsUpDataSec(1)
      }
    }
    // 发送修改请求
    else {
      const { level, name } = formRef.current?.getFieldsValue()
      // console.log('以获取到要修改的数据')
      setNeedReq({ level, name })
    }
  };

  
  // 接收来自table的category数组
  const accept = (array) => {
    // console.log('accept')
    setCategory(array)
  }
  // 接收来自table的SecCategory数组
  const accept2=(array)=>{
    setSecCategory(array)
  }


  // 初始化菜单，即返回一级列表
  const initTitle = () => {
    setInit(1)
  }


  // 接收父级id和name
  const getTitle = (id, name) => {
    // console.log(id, name)
    if (id === '0' && name) {//跳转到下一个页面
      setInit(0)//更新状态
      setTitle(
        <div>
          <Button type='link' onClick={initTitle}>一级分类</Button>
          <ArrowRightOutlined style={{ marginRight: '15px' }} />
          {name}
        </div>
      )
    }
    else if (name) {
      setTitle(<div>
        二级分类
        <ArrowRightOutlined />
        {name}
      </div>)
    }
  }


  // 修改菜单数据后，重新加载
  useLayoutEffect(() => {
    // console.log('修改发送请求', needReq)
    if(needReq.level && needReq.name){
      reqUpdateCategory(needReq.level, needReq.name)
    }
    setIsUpDataFirst(1)
  }, [needReq])// eslint-disable-line


  // 点击添加按钮，框展示
  const showModal = () => {
    setAddOrReq(0)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onFinish()
    setIsModalVisible(false);
    setAddOrReq(0)
  };


  const handleCancel = () => {
    setAddOrReq(0)
    setIsModalVisible(false);
  };

  const [title, setTitle] = useState('一级分类')//初始化菜单
  const [isModalVisible, setIsModalVisible] = useState(false);//添加按钮显示框
  const extra = (
    <div>
      <Button type='primary' onClick={showModal}>
        <PlusOutlined />
        添加
      </Button>
      <Modal title="添加分类" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Forms category={category} formRef={formRef} onFinish={onFinish} addOrReq={addOrReq} secCategory={secCategory} form={form}/>
      </Modal>
    </div>

  )
  return (
    <div>
      <Card
        title={title}
        extra={extra}
        style={{
          width: '100%',
        }}
      >
        <Tables
          getTitle={getTitle}
          init={init}
          acceptCatGory={accept}
          isUpDataFirst={isUpDataFirst}
          isUpDataSec={isUpDataSec}
          setIsUpDataFirst={setIsUpDataFirst}
          setIsUpDataSec={setIsUpDataSec}
          addOrReq={addOrReq}
          setAddOrReq={setAddOrReq}
          showModal={showModal}
          needReq={needReq}
          setIsModalVisible={setIsModalVisible}
          setSecCategory={setSecCategory}
          accept2={accept2}
          setForm={setForm}
        >
        </Tables>
      </Card>
    </div>
  )
}
