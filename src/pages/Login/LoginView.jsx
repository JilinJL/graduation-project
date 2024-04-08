import React, { useEffect } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, message } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import LoginBox from "@/components/LoginBox";
import LoginModel from "./LoginModel";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
	const store = new LoginModel();
	const navigate = useNavigate();

	const handleLogin =async data => {
		let result = await store.useLogin(data);
		if(result){
			navigate("/", { replace: true });
		}
	};

	const handleRegister = async data => {
		let ok = await store.useRegister(data);
		if(ok){
			message.success("注册成功~");
			setTimeout(()=>{
				location.reload();
			},800);
		}
	};

	const handleCheckName = async data => {
		let ok = await store.checkUserName(data);
		ok && message.error("用户名重复,请换一个吧!");
	};

	return <LoginBox store={store} handleCheckName={handleCheckName} handleLogin={handleLogin} handleRegister={handleRegister} />;
};

export default observer(LoginView);
