import React, { useEffect ,useRef, useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Descriptions,Button,Tag } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ContentModel from "./ContentModel.js";
import { useParams } from "react-router-dom";
import * as echarts from 'echarts';
import Utils from "@/utils/Utils";

const store = new ContentModel();
const ContentView = props => {

    return (
        <div></div>
    )
};

export default observer(ContentView);
