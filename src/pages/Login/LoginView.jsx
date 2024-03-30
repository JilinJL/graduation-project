import React, { useEffect } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import LoginBox from "@/components/LoginBox";
import LoginModel from "./LoginModel";

const store = new LoginModel();


const handleLogin = (data) =>{
        console.log(data);
}

const handleRegister = (data) =>{
        console.log(data);
}

const handleCheckName = (data) =>{
        console.log(`用户名${data}重复`)
}

const LoginView = () => {
	return <LoginBox store={store} handleCheckName={handleCheckName} handleLogin={handleLogin} handleRegister={handleRegister} />;
};

export default observer(LoginView);
