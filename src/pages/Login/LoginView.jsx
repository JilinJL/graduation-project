import React, { useEffect } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import LoginBox from "@/components/LoginBox";
import LoginModel from "./LoginModel";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
        
	const store = new LoginModel();
	const navigate = useNavigate();

	const handleLogin = data => {
		console.log(data);
		localStorage.setItem("token", "111");
		navigate("/", { replace: true });
	};

	const handleRegister = data => {
		console.log(data);
		localStorage.setItem("token", "111");
		navigate("/", { replace: true });
	};

	const handleCheckName = data => {
		console.log(`用户名${data}重复`);
	};

	return <LoginBox store={store} handleCheckName={handleCheckName} handleLogin={handleLogin} handleRegister={handleRegister} />;
};

export default observer(LoginView);
