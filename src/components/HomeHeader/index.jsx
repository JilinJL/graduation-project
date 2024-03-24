import React,{useState,useEffect,useCallback} from "react"
import './index.less'
import Utils from "../../utils/Utils";
import { Layout, Menu, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header,Content, Footer, Sider } = Layout;
const items = [{index:1},{index:2}].map(
    (icon, index) => ({
      key: String(index + 1),
      label: `nav ${index + 1}`,
    }),
  );

const HomeHeader = (props)=>{


    return (
      <Header
      style={{
        padding: 0,
        background: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
    <h2>NLP情感分析系统</h2>
    </Header>     
    )
}

export default HomeHeader;