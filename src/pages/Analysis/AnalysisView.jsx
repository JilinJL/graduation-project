import React, { useEffect } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import AnalysisModel from "./AnalysisModel"

const store = new AnalysisModel();


const handleLogin = (data) =>{
        console.log(data);
}

const handleRegister = (data) =>{
        console.log(data);
}

const handleCheckName = (data) =>{
        console.log(`用户名${data}重复`)
}

const LoginView = (props) => {

    console.log(props)

	return <div>{props.params.analysisId}</div>
};

export default observer(LoginView);
