import React, { useState, useEffect, useCallback,useRef } from "react";
import "./index.less";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme, Input, Button, Popover, List, Modal, Space, Form, Select } from "antd";
import { FormOutlined, UploadOutlined, UserOutlined, LoginOutlined, GithubOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
import { Collapse, Popconfirm } from "antd";
import AnalysisTags from "@/components/AnalysisTags";
import config from "@/assets/config";
const { Panel } = Collapse;

const HomeSider = props => {
	const [openNew, setOpenNew] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [open, setOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [type, setType] = useState(config.options[0].value);
	const navigate = useNavigate();

	// 气泡弹窗
	const showPopconfirm = () => {
		setOpenNew(true);
	};

	const handleChange = value => {
		setType(value);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		// TODO 新建

		setTitle("");
		navigate(`/?title=${title}&type=${type}`)

		setOpenNew(false);
		setConfirmLoading(false);
	};

	const handleCancel = () => {
		setOpenNew(false);
	};

	const handleSearch = e => {
		const results = props.contentList.filter(item => item.contentTitle.includes(e.target.value));
		console.log(results);
		setSearchTerm(e.target.value);
		setSearchResults(results);
	};

	const sortList = Utils.splitArrayByTime(props.contentList);
	const items = [
		{
			key: "1",
			label: "今天",
			children: sortList.today.map(data => AnalysisTags(data)),
		},
		{
			key: "2",
			label: "一周内",
			children: sortList.lastSevenDays.map(data => AnalysisTags(data)),
		},
		{
			key: "3",
			label: "更久",
			children: sortList.other.map(data => AnalysisTags(data)),
		},
	];

	const hide = () => {
		setOpen(false);
	};

	const handleOpenChange = newOpen => {
		setOpen(newOpen);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login", { replace: true });
	};

	return (
		<Sider className='home-sider' breakpoint='lg' collapsedWidth='0' onBreakpoint={broken => {}} width={"13rem"} style={{ backgroundColor: "#f2f2f2" }}>
			<div className='manage_header'>
				<Input placeholder='搜索' allowClear onChange={handleSearch} style={{ width: 300 }} />
				<Popconfirm
					title='标题'
					description={() => (
						<div>
							<Space.Compact>
								<Select defaultValue={type} onChange={handleChange} options={config.options} />
								<Input
									value={title}
									onChange={e => {
										setTitle(e.target.value);
									}}
								/>
							</Space.Compact>
						</div>
					)}
					open={openNew}
					onConfirm={handleOk}
					okButtonProps={{
						loading: confirmLoading,
					}}
					onCancel={handleCancel}
					icon={<FormOutlined />}
				>
					<Button ref={props.ref1} className='manage_header_button' onClick={showPopconfirm}>
						新建分析
					</Button>
				</Popconfirm>
			</div>
			<div className='list'>
				{!searchTerm && <Collapse items={items} defaultActiveKey={["1"]} />}
				{searchTerm && (
					<Collapse
						showArrow={false}
						ghost
						collapsible={false}
						items={[
							{
								key: "1",
								label: "搜索结果",
								showArrow: false,
								children: searchResults.map(data => AnalysisTags(data)),
							},
						]}
						defaultActiveKey={["1"]}
					/>
				)}
			</div>
			<div className='manage_footer'>
				<Popover
					content={
						<div style={{ width: "8rem" }}>
							<ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
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
						style={{ color: Utils.getRandomColor(),display: "inline-block", padding: "0.2rem", fontSize: "2rem", borderRadius: "50%", border: "1px solid #ccc" }}
					/>
					<div className='username'>{localStorage.getItem('userName') || 新用户}</div>
				</Popover>
			</div>
			<Modal title='关于项目' open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
				<a href='https://github.com/JilinJL/graduation-project' target='_blank'>
					<GithubOutlined />
				</a>
			</Modal>
		</Sider>
	);
};

export default HomeSider;
