import axios from "axios";
import { message } from "antd";

const request = axios.create({
	baseURL: "http://localhost:8099/api", //本地测试
	//   baseURL: 'http://api.example.com',    //外网
});

// 标记token是否已经过期
let isTokenExpired = false;

// 添加请求拦截器
request.interceptors.request.use(
	function (config) {
		// 带上token
		const token = localStorage.getItem("token") || "";
		if (token) {
			config.headers.token = token;
		}

		return config;
	},
	function (error) {
		alert(error.message);
	},
);

// 添加响应拦截器
request.interceptors.response.use(
	function (response) {
		// 如果之前token已过期，则重置标记
		if (isTokenExpired) {
			isTokenExpired = false;
		}

		if (response.data.code === 300) {
      history.go(-1);
		}
		return response;
	},
	function (error) {
		// 如果响应错误状态码为405，表示token过期或无效
		if (error.response && error.response.status == 405) {
			// 如果之前token已过期，则不再执行后续操作
			if (!isTokenExpired) {
				isTokenExpired = true;
				message.error("token过期,请重新登陆");
				setTimeout(() => {
					localStorage.removeItem("token");
					window.location.href = "/login"; // 重定向到登录页面
				}, 2000);
			}
		}
		return Promise.reject(error);
	},
);

export default request;
