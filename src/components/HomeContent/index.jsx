import React,{useState,useEffect,useCallback} from "react"
import './index.less'
import Utils from "../../utils/Utils";
import { Typography } from 'antd';
const { Title } = Typography;
import { Layout, Menu, theme,Button } from 'antd';
const { Header,Content, Footer, Sider } = Layout;
import {Outlet} from 'react-router-dom'
import {observer} from 'mobx-react'

const HomeContent = observer((props)=>{


    return (
      <Content
      style={{
        width: '100%',
        background:'#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      {/* 内容展示位置 */}
      内容区
      <Outlet />
      
      
    </Content>   
    )
})

export default HomeContent;