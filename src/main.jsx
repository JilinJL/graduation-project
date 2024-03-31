import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import router from "@/routes/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import theme from "@/assets/theme.js"; // 自定义主题文件路径

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<ConfigProvider theme={theme}>
			<RouterProvider router={router} />
		</ConfigProvider>
	// </React.StrictMode>,
);
