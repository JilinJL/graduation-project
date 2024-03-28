import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme,Input } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import AnalysisTag from "../AnalysisTags"

const items = [
	{
		key: "1",
		label: "This is panel header 1",
		children: <p>{123}</p>,
	},
	{
		key: "2",
		label: "This is panel header 2",
		children: <p>{333}</p>,
	},
	{
		key: "3",
		label: "This is panel header 3",
		children: [1,5,4,8,9,10].map((cur)=><AnalysisTag props={cur} />),
	},
];



const { Header, Content, Footer, Sider } = Layout;

const HomeSider = props => {
	return (
		<Sider breakpoint='lg' collapsedWidth='0' onBreakpoint={broken => {}} width={250} style={{ backgroundColor: "#f2f2f2" }} className='home-sider'>
			<div className='manage'>
				<div className='manage_header'>
				</div>
				<div className='list'>
					<Collapse items={items} defaultActiveKey={["1"]} />;
				</div>
			</div>
		</Sider>
	);
};

export default HomeSider;
