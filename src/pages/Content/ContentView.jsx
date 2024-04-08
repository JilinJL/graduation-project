import React, { useEffect ,useRef, useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { List,Avatar, Layout, Menu, theme, Descriptions,Button,Tag } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ContentModel from "./ContentModel.js";
import { useParams, useSearchParams } from "react-router-dom";
import * as echarts from 'echarts';
import Utils from "@/utils/Utils";
import './ContentView.less'

const store = new ContentModel();
const ContentView = props => {


    const [search,setsearch] = useSearchParams()
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
  
    const handleSendMessage = () => {
      // 发送消息逻辑，可以在此调用后端接口进行消息处理
      const newMessage = {
        text: inputText,
        sender: 'user', // 用户发送的消息
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    };
  

    
    return (
        <div className="main">
            <div className="tips">
                
            </div>
            <div className="content"></div>
            <div className="input"></div>
      </div>
    )
};

export default observer(ContentView);
