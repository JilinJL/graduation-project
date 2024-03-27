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

const HomeSider = (props)=>{


    return (
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            }}
            style={{backgroundColor: '#f2f2f2'}}
        >
            <div className="manage">
              <input type="search" />
            </div>
            </Sider>       
    )
}

export default HomeSider;