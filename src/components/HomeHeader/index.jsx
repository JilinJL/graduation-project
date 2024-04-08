import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Typography } from "antd";
const { Title } = Typography;
import { Layout, Menu, theme, Select, Tour } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const HomeHeader = props => {
	const navigate = useNavigate();

	const title = "NLP情感分析系统";

	return (
		<div id='home-header' style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
			<Header
				style={{
					padding: 0,
				}}
				className='home-header'
			>
				<Title className='title' level={2} title={"点击返回首页"} style={{ cursor: "pointer" }}>
					<strong
						onClick={() => {
							navigate("/");
						}}
					>
						{title}
					</strong>
					<i style={{ fontSize: "0.6rem" }} onClick={() => props.setOpen(true)}>
						<QuestionCircleOutlined style={{ marginLeft: "1rem" }} />
						帮助
					</i>
				</Title>
			</Header>
		</div>
	);
};

export default HomeHeader;
