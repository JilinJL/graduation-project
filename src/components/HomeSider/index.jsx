import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme, Input, Button, Popover, List, Modal } from "antd";
import { UploadOutlined, UserOutlined, LoginOutlined, GithubOutlined,QuestionCircleOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import { Collapse } from "antd";



const HomeSider = props => {


/* 	const items = props.contentList?.map(content=>{
		content.key = content.id
		content.children=<span key={content.id}>{content.title}</span>
		content.label = content.title
		return content
	}) */

	const items = [
		{
            key: "1",
            label: "今天",
            children: <span>123</span>,
        },
        {
            key: "2",
            label: "一周内",
            children: <span>123</span>,
        },
        {
            key: "3",
            label: "更久",
            children: <span>123</span>,
        },
	]
	// 设置注销路由
	const navigate = useNavigate();
	const handleLogout = () => {
		// 清除用户凭证

		// 然后执行路由跳转
		navigate("/login", { replace: true }); // 或者用 navigate(-1) 返回上一页
	};

	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const hide = () => {
		setOpen(false);
	};
	const handleOpenChange = newOpen => {
		setOpen(newOpen);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleNewAnalysis = () => {
		console.log("New Analysis");
	};


	console.log(props)


	return (
		<Sider className='home-sider' breakpoint='lg' collapsedWidth='0' onBreakpoint={broken => {}} width={"15rem"} style={{ backgroundColor: "#f2f2f2" }}>
			<div className='manage_header'>
				<Input className='manage_header_search' placeholder='搜索分析记录' />
				<Button className='manage_header_button' onClick={handleNewAnalysis}>
					新建分析
				</Button>
			</div>
			<div className='list'>
				<Collapse items={items} defaultActiveKey={["1"]} />
			</div>
			<div className='manage_footer'>
				<Popover
					content={
						<div style={{ width: "8rem" }}>
							<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
								<li></li>
								<li onClick={showModal}>
									<a>
										<QuestionCircleOutlined /> 关于此项目
									</a>
								</li>
								<li onClick={handleLogout}>
									<a>
										<LoginOutlined /> 注销
									</a>
								</li>
							</ul>
						</div>
					}
					trigger='click'
					open={open}
					onOpenChange={handleOpenChange}
					arrow={false}
				>
					<UserOutlined
						className='user_icon'
						style={{ display: "inline-block", padding: "0.2rem", fontSize: "2rem", borderRadius: "50%", border: "1px solid #ccc" }}
					/>
					<div className='username'>用户名</div>
				</Popover>
			</div>

			<Modal title='关于项目' open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={null} >
				<a href='https://github.com/JilinJL/graduation-project' target="_blank" ><GithubOutlined /></a>
			</Modal>
		</Sider>
	);
};

export default HomeSider;
