import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Home from './home'
import UpData from './updata'
import Detail from './detail'
import AddPro from './addPro'
// 商品
export default function Product() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='./home'/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/updata' element={<UpData/>}></Route>
                <Route path='/addPro' element={<AddPro/>}></Route>
                <Route path='/detail' element={<Detail/>}></Route>
                <Route path='*' element={<Navigate to='./home'/>}></Route>
            </Routes>
        </div>
    )
}
