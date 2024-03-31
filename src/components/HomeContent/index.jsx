import React,{useState,useEffect,useCallback} from "react"
import './index.less'
import Utils from "../../utils/Utils";
import { Typography } from 'antd';
const { Title } = Typography;
import { Layout, Menu, theme,Button } from 'antd';
const { Header,Content, Footer, Sider } = Layout;
import {Outlet, useLocation} from 'react-router-dom'
import {observer} from 'mobx-react'

const HomeContent = observer((props)=>{

  const location = useLocation();


    return (
      <Content
      className="content"
    >

      {/* 内容展示位置 */}
      <Outlet />
      {location.pathname==='/'&&
      <div className="info">
        <div className="left">
        <h2>模型</h2>
        更换模型可以使用更多扩展功能，涉及等多方面的分析与建议
        </div>
        <div className="middle">
        <h2>功能</h2>
        <b>个人情感分析</b>
        ：个人可以通过对自己的聊天记录进行情感分析，了解自己在对话中表达的情绪状态，从而更好地管理情绪、改善沟通方式。
        <br />
        <b>社交关系分析</b>
        ：分析与特定人或群组的聊天记录，了解在交流中的情感动态，有助于评估与他人的关系亲密程度、沟通效果等。
        <br />
        <b>情感驱动的推荐系统</b>
        :基于聊天记录中的情感信息，为用户提供个性化的推荐服务，例如针对特定情绪状态推荐适合的电影、音乐、文章等。
        </div>
        <div className="right">
        <h2>进展</h2>
        系统持续优化更新中...
        </div>
      </div>
    }
      
    </Content>   
    )
})

export default HomeContent;