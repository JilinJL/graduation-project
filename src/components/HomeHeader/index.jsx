import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Typography } from "antd";
const { Title } = Typography;
import { Layout, Menu, theme } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const HomeHeader = props => {
	return (
		<div id='home-header' style={{ backgroundColor: "#ffffff", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
			<Header
				style={{
					padding: 0,
				}}
				className='home-header'
			>
				<Title className='title' level={2}>
					NLP情感分析系统
				</Title>
			</Header>
		</div>
	);
};

export default HomeHeader;
