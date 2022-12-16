import React, { useState,useLayoutEffect,useEffect } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import './index.css'
import { getWeather } from '../../api';
import Weather from './weather';
// 导入menuitem
import items from '../../config/menuConfig'
// 导入删除内存
import storageUtils from '../../utils/storageUtils';
export default function Header(props) {
    // console.log(props.user.username)
    // 获取当前的cityCode
    const AMap = window.AMap;//必须加，不然AMap报错
    let map = new AMap.Map('container', {
        resizeEnable: true
    });
    let cityCode = map.getAdcode()
    // 申请当地天气
    const [data, setData] = useState('晴');
    useLayoutEffect(() => {
        const fetchData = async () => {
            const result = await getWeather({
                'key': '8cbce996c823d6d73d55d29136f6557b',
                'city': cityCode,
                'output': 'json'
            });
            setData(data => [result.data.lives[0].weather]);
        };
        fetchData();
    }, []);
    // 获取时间
    const [time, setTime] = useState('');
    useLayoutEffect(()=>{
        const time = new Date();
        const year = time.getFullYear(); //年
        const month = time.getMonth() + 1; //月
        const day = time.getDate(); //日
        const hour = time.getHours(); //时
        const minutes = time.getMinutes();//分 
        const s = time.getSeconds(); //秒
        const seconds = s <= 9 ? "0" + s : s;
        const t = year + '年' + month + '月' + day + "日" + " " + hour + ":" + minutes + ":"
            + seconds;   
        setTime(t);
        setInterval(setTime,1000)
    })
    // 申请网址
    const [web,setWeb]=useState('/home')
    const location=useLocation()
    useLayoutEffect(()=>{
        let path=location.pathname
        setWeb(web=>path)
    },[location.pathname])
    // 获取标题
    const [title, setTitle] = useState('首页')
    useEffect(() => {
        let urlParams = new URL(window.location.href);
        urlParams = new URL(window.location.href);
        let pathname = urlParams?.pathname;
        pathname = pathname.replace('/admin', '')
        // 初始是空，你要设置一个默认值，不然items1[0].children报错
        if(pathname===''){
            pathname='/home'
        }
        // 筛选出来合适的父元素或者本身
        const items1 = items.filter((item) => {
            if (item.children) {
                let itemArray= item.children.filter((itemChild) => {
                    // return itemChild.key === pathname
                    return pathname.indexOf(itemChild.key)===0
                })
                return itemArray.length!==0
            }
            else if (item.key)
                // return item.key === pathname
                return pathname.indexOf(item.key)===0
        })
        console.log('5656',items1,pathname)
        // 查看是否得出本身
        if(items1[0].children){    //不是本身
            let items2=items1[0].children.filter((item)=>{
                // return item.key === pathname
                return pathname.indexOf(item.key)===0
            })
            setTitle(title => items2[0].label.props.children);
        }
        else{                   //是本身
            setTitle(title => items1[0].label.props.children);
        }
    },[web]);
    // 退出
    const navgate = useNavigate()
    const back=()=>{
        storageUtils.deleteUser()
        
        navgate('/login')
        // <Navigate to='/login' replace={true}/>
    }
    return (
        <div className='header'>
            <div className="header-top">
                <span className="button">
                    <Button
                        type="primary"
                        onClick={props.toggleCollapsed}
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </span>

                <span>欢迎,{props.user.username}</span>
                <Button onClick={back} className='back'>退出</Button>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    {title}
                </div>
                <div className="header-bottom-right">
                    <span>{time}</span>
                    <span className='weather'>
                        <Weather weather={data} />
                    </span>
                    <span>{data}</span>
                </div>
            </div>
        </div >
    )
}
