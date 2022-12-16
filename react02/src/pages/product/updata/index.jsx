import React, { useEffect, useState, Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
} from 'antd';
import { LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { reqCategory, reqCategoryName, reqUpdate, reqUpLoadImg, reqDeleteImg } from '../../../api';

// 初始化
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const optionLists = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];
// 上传图片组件
const UpLoadImg = (props) => {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });
    const [previewOpen, setPreviewOpen] = useState(true);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // 取消MODAL的操作，不过加载不出来，这个生效失败
    const handleCancel = () => setPreviewOpen(false);
    // 点击预览，但加载不出来，原因不明，和thumurl无关
    const handlePreview = async (file) => {
        // console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.thumbUrl || file.url || file.preview);
        setPreviewOpen(true);

        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    // 状态改变
    const handleChange = async ({
        fileList: newFileList,
        file
    }) => {
        file.size = 38105
        // 更新数据列表
        setFileList(newFileList);
        // console.log(file, fileList)
        // 数据返回成功
        if (file.status == 'done' && file.response.data.url) {

            // 更改文件连接
            file.thumbUrl = file.response.data.url;
            // 更改文件名字
            file.name = file.response.data.name
            // 上传给父组件文件名字
            props.GetImgName(newFileList)
        }
        if (file.status == 'removed') {
            // 删除图片
            const result = await reqDeleteImg(file.response.data.name)
            // console.log(result)
        }
    }
    // 上传按钮，没啥改的
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload
                action="/manage/img/upload"
                accept='image/*,.pdf'
                name='image'
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} onPreview={handlePreview}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
// 文本编辑器
const RichTextEditor = (props) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorStates) => {
        props.getDetail(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        setEditorState(editorStates)
    };
    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{border:'1px solid black',minHeight:'250px',paddingLeft:'10'}}
                toolbarClassName="demo-toolbar"
                onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}
// 表单组件
const FormDisabledDemo = (props) => {
    // 设置图片初始数组
    const [ImgName, setImgName] = useState([])
    // 设置商品详情
    const [details,setDetails]=useState()
    // 获取 商品ID 商品分类ID 父分类ID
    const location = useLocation()
    const { state } = location
    const { _id, categoryId, pCategoryId } = state
    // 获取名称 价格 详情 描述 
    const finish = async (values) => {
        // console.log('ad', values,_id,categoryId,pCategoryId)
        // 更新
        const result = await reqUpdate(_id, categoryId, pCategoryId, values.name, values.desc, values.price, details, ImgName)
        // console.log(result)
    }
    // 获取图片名字
    const GetImgName = (fileList) => {
        const fileList1 = fileList.map((file) => {
            return file.name
        })
        // console.log('list', fileList1)
        setImgName(fileList1)
    }
    // 获取详情细节
    const getDetail=(detail)=>{
        setDetails(detail) 
    }
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                layout="horizontal"
                // onValuesChange={onFormLayoutChange}
                // disabled={componentDisabled}
                onFinish={finish}
            >
                <Form.Item
                    label="商品名称"
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ProductName!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品描述"
                    name='desc'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ProductDescribe!',
                        },
                    ]}
                >
                    <Input.TextArea
                        showCount
                        maxLength={100}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    // onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    label="商品价格"
                    name='price'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ProductPrice!',
                        },
                        {
                            required: false,
                            pattern: /^(-)?[0-9]+([.][0-9]{1,})?$/,
                            message: '只能输入数字',
                        }
                    ]}>
                    <InputNumber addonAfter="元" controls />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name='category'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ProductCategory!',
                        },

                    ]}
                >
                    <Cascader options={props.options} loadData={props.loadData} onChange={props.onChange} changeOnSelect />
                </Form.Item>

                <Form.Item label="商品图片" valuePropName="fileList">
                    <UpLoadImg GetImgName={GetImgName} />
                </Form.Item>
                <Form.Item label="商品详情" name='detail'
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}>
                    <RichTextEditor getDetail={getDetail}></RichTextEditor>

                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit" onClick={finish} type='primary' style={{ marginLeft: '130px', backgroundColor: '#1da57a' }}>提交</Button>
                </Form.Item>
            </Form>
        </>
    );
};
// 主组件 product 添加和修改的路由组件
export default function UpData(props) {
    // 一级菜单
    const [options, setOptions] = useState(optionLists);
    const onChange = (value, selectedOptions) => {
        // console.log(value, selectedOptions);
    };
    // 接取值
    const location = useLocation()
    // 获取商品分类
    useEffect(() => {
        const { state } = location
        const fetch = async () => {
            // 获取所有一级种类
            const result = await reqCategory(0)

            // setState
            setOptions(() => {
                // map整合
                const category = [
                    result.data.data.map((product) => {
                        return {
                            value: product.name,
                            label: product.name,
                            isLeaf: false,
                            id: product._id
                        }
                    })
                ]
                // console.log(category[0])
                return category[0]
            })
        }
        fetch()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true; // load options lazily

        setTimeout(async () => {
            targetOption.loading = false;
            // 根据主分类id获取子分类
            // 获取所有一级种类
            const result2 = await reqCategory(targetOption.id)
            const children = [
                result2.data.data.map((product) => {
                    return {
                        label: `${product.name}`,
                        value: `${product.name}`
                    }
                })
            ]

            // console.log(targetOption.id, result2.data.data, children)
            // targetOption.children = [
            //     {
            //         label: `${targetOption.label} Dynamic 1`,
            //         value: 'dynamic1',
            //     },
            //     {
            //         label: `${targetOption.label} Dynamic 2`,
            //         value: 'dynamic2',
            //     },
            // ];
            targetOption.children = children[0]
            setOptions([...options]);
        }, 500);
    };
    // 后退按钮
    const navigate = useNavigate()
    const back = () => {
        navigate(-1)
    }
    const head = (
        <div>
            <ArrowLeftOutlined style={{ fontSize: '30px', color: '#CAEABB' }} onClick={back} />
            <span style={{ marginLeft: '25px', fontSize: '25px' }}>商品修改 </span>
        </div>
    )
    return (
        <div>
            <Card
                title={head}
                extra={<a href="#">More</a>}
                style={{
                    width: '100%',
                }}
            >
                <FormDisabledDemo options={options} loadData={loadData} onChange={onChange} />
            </Card>
        </div>

    )
}