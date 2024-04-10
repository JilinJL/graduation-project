import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Typography, Row, Col, Card, Space, Select, Form, Spin } from "antd";
const { Title } = Typography;
import { Layout, Menu, theme, Button, Input } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { LoadingOutlined } from "@ant-design/icons";
import { Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import config from "@/assets/config";
import HomeText from "../HomeText";
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
						<HomeText type={type} />
					</div>

					<div className='input' ref={props.ref2}>
						<Spin tip="分析生成中..." spinning={props.loading}
							indicator={
								<LoadingOutlined
									style={{
										fontSize: 24,
									}}
									spin
								/>
							}
						>
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
								<div style={{ position: "relative" }}>
									<TextArea
										placeholder='在这里输入待分析文本'
										onPressEnter={Utils.onlyContainsNewLines(textData) ? "" : handleSubmit}
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
						</Spin>
					</div>
				</div>
			)}
		</Content>
	);
});

export default HomeContent;
