import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Typography, Row, Col, Card, Space, Select, Form } from "antd";
const { Title } = Typography;
import { Layout, Menu, theme, Button, Input } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import config from "@/assets/config";
const { TextArea } = Input;

const HomeContent = observer(props => {
	const location = useLocation();
	const [type, setType] = useState(config.options[0].value);
	const [title, setTitle] = useState("");
	const [textData, setTextData] = useState("");

	useEffect(() => {
		if (props.newData) {
			setTitle(props.newData.title || "");
			setType(props.newData.type || config.options[0].value);
		}
	}, [props.newData]);

	const handleSubmit = () => {
		if (!title.trim()) {
			// 如果标题为空，则提示错误并返回
			alert("请输入标题");
			return;
		}

		// 执行提交操作
		props.handleSubmit({ type, title, textData });
	};

	return (
		<Content className='content'>
			{/* 内容展示位置 */}
			<Outlet />
			{location.pathname === "/" && (
				<div>
					<div>
						<Row gutter={24}>
							<Col span={7}>
								<Card title='模型' bordered={false}>
									更换模型可以使用更多扩展功能，涉及等多方面的分析与建议
								</Card>
							</Col>
							<Col span={10}>
								<Card title='功能' bordered={false}>
									<b>个人情感分析</b>
									<br />
									个人可以通过对自己的聊天记录进行情感分析，了解自己在对话中表达的情绪状态，从而更好地管理情绪、改善沟通方式。
									<br />
									<b>情感驱动的推荐系统</b>
									<br />
									基于聊天记录中的情感信息，为用户提供个性化的推荐服务，例如针对特定情绪状态推荐适合的电影、音乐、文章等。
								</Card>
							</Col>
							<Col span={7}>
								<Card title='特点' bordered={false}>
									<b>
										简单易用
										<br />
									</b>
									<b>
										跨平台支持
										<br />
									</b>
									<b>
										轻量级
										<br />
									</b>
								</Card>
							</Col>
						</Row>
					</div>

					<div className='input' ref={props.ref2}>
						<Form name='newContent'>
							<Select onChange={setType} value={type} defaultValue={config.options[0].value} options={config.options} />
							<Input
								value={title}
								addonBefore='标题'
								required={true}
								onChange={e => setTitle(e.target.value)}
								allowClear
								defaultValue=''
								style={{ margin: "0 0.1rem", width: "16rem" }}
							/>
							<div style={{ position: "relative" }} >
								<TextArea
									placeholder='在这里输入待分析文本'
									onPressEnter={Utils.onlyContainsNewLines(textData)?"":handleSubmit}
									onChange={e => setTextData(e.target.value)}
									value={textData}
									style={{ margin: "0.1rem 0", paddingRight: "2rem", boxSizing: "border-box" }}
									autoSize={{
										minRows: 3,
										maxRows: 6,
									}}
								/>
								<Button onClick={handleSubmit} style={{ border: "1px solid #ccc", position: "absolute", bottom: "0.2rem", right: "0.1rem" }} type='submit'>
									↑
								</Button>
							</div>
						</Form>
					</div>
				</div>
			)}
		</Content>
	);
});

export default HomeContent;
