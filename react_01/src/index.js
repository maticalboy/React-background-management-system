import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// 自己写的

// 引入App
import App from './App'
// 引入路由包裹
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
// 引入路由
import Rout from './routes'
import Login from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    {/* 引入路由 */}
      <Routes>
        {/* 起始页面 跳转到admin*/}
        <Route path='/' element={<Navigate to='admin' />}></Route>

        {/* 主页面App */}
        <Route path='admin' element={<App />}></Route>
        
        {/* 登入页面 */}
        <Route path='login' element={<Login />}></Route>
        
        {/* 找不到重定向到404 */}
        <Route path='*' element={<Navigate to='/404' />}></Route>
      </Routes>
      <Rout/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
