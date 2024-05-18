import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Typography } from "antd";
const { Title } = Typography;
import { Layout, Menu, theme, Select, Tour } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { UploadOutlined,PicRightOutlined, UserOutlined, VideoCameraOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const HomeHeader = props => {
	const navigate = useNavigate();
	const [current, setCurrent] = useState("");
	const onClick = e => {
		if(e.key!='details'){
			navigate(e.key)
		}
		setCurrent(e.key);
	};
	const title = "NLP情感分析系统";
	const items = [
		{
			label: "词云图分析",
			key: "/wordsCloud",
			icon: <AppstoreOutlined />,
		},
		{
			label: (
				<a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
					<PicRightOutlined /> &nbsp;
					情感字典
				</a>
			),
			key: "details",
		},
	];
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

			<Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
		</div>
	);
};

export default HomeHeader;