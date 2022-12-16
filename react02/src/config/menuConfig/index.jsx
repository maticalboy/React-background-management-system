
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    AreaChartOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
    ToolOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(<Link to='./home' >首页</Link> , '/home', <HomeOutlined /> ),
    getItem('商品', 'sub1', <AppstoreOutlined /> ,[
        getItem(<Link to='./category'>品类管理</Link> ,'/category',<UnorderedListOutlined />),
        getItem(<Link to='./product'>商品管理</Link> ,'/product',<ToolOutlined />)
    ]),
    getItem(<Link to='./user'>用户管理</Link> , '/user',<UserOutlined /> ),
    getItem(<Link to='./role'>角色管理</Link> , '/role', <SafetyCertificateOutlined />),
    getItem('图形图表', 'sub2', <AreaChartOutlined />, [
        getItem(<Link to='./charts/bar'>柱形图</Link> , '/charts/bar',<BarChartOutlined />),
        getItem(<Link to='./charts/line'>折线图</Link> , '/charts/line',<LineChartOutlined />),
        getItem(<Link to='./charts/pie'>饼图</Link> , '/charts/pie',<PieChartOutlined /> ),
    ]),
];
export default items