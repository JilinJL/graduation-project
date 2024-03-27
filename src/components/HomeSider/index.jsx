import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme, Input ,Button } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import { Collapse } from "antd";

const item = obj => {
	return <div key={obj}>{obj}</div>;
};

const items = [
	{
		key: "1",
		label: "今天",
		children: <p>{123}</p>,
	},
	{
		key: "2",
		label: "七天内",
		children: <p>{333}</p>,
	},
	{
		key: "3",
		label: "更久",
		children: [1, 5, 9, 10].map(cur => item(cur)),
	},
];


const HomeSider = props => {

  const handleNewAnalysis = () =>{
    console.log("New Analysis")
  }

	return (
		<Sider className='home-sider' breakpoint='lg' collapsedWidth='0' onBreakpoint={broken => {}} width={"15rem"} style={{ backgroundColor: "#f2f2f2" }} >

				<div className='manage_header'>
        <Input className="manage_header_search"  placeholder='搜索分析记录' />
          <Button className="manage_header_button" onClick={handleNewAnalysis}>新建分析</Button>
				</div>
				<div className='list'>
					<Collapse items={items} defaultActiveKey={["1"]} />
				</div>
        <div className="manage_footer">
          <UserOutlined className="user_icon" style={{padding:"0.2rem",fontSize: '2rem',borderRadius:"50%",border: "1px solid #ccc"}} />
        </div>
		</Sider>
	);
};

export default HomeSider;
