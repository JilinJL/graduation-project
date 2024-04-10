import React, { useState, useEffect, useCallback, useRef } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { Layout, Menu, theme, Select, Tour, Row, Col, Card } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const HomeText = props => {
	const total = {
		Sentiment: {
			title: "情感分析",
			text: `情感分析是一种自然语言处理技术，旨在识别文本中的情绪、态度和情感倾向。它可以帮助分析社交媒体上的用户评论、产品评论、新闻文章等文本，并自动判断其中所表达的情绪是正面的、负面的还是中性的。应用领域包括社交媒体舆情分析、市场营销、客户服务等`,
		},
        Transform: {
            title: "AI翻译",
            text: `AI翻译是指利用人工智能技术进行自动翻译的过程。
            它可以将一种语言的文本或口语内容自动翻译成另一种语言，以实现跨语言沟通。
            基于神经网络的机器翻译技术在这方面取得了巨大进步，使得翻译质量逐渐接近人类水平。
            应用领域包括国际商务、旅游、跨文化交流等。`,
        },
        Recommend: {
            title: "旅游知识库",
            text: `旅游知识库是一个包含大量旅游相关信息的数据库或知识库。
            它可以包括旅游目的地的信息、景点介绍、旅游路线、交通信息、住宿推荐等内容。
            这样的知识库可以用于旅游规划、旅游咨询、旅游指南等方面，为旅行者提供相关信息和建议。`
        }
	};

	const text1 = "更换模型可以使用更多扩展功能，涉及等多方面的分析与建议";
	const text2 = "个人可以通过对自己的聊天记录进行情感分析，了解自己在对话中表达的情绪状态，从而更好地管理情绪、改善沟通方式。";
	const text3 = "基于聊天记录中的情感信息，为用户提供个性化的推荐服务，例如针对特定情绪状态推荐适合的电影、音乐、文章等。";

    useEffect(()=>{

    },[props])
	return (
		<Row gutter={24}>
			<Col span={7}>
				<Card title='模型' bordered={false}>
					{text1}
				</Card>
			</Col>
			<Col span={10}>
				<Card title={total[props.type]?.title || '-'} bordered={false}>
                   {total[props?.type]?.text || '-'}
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
	);
};

export default HomeText;
