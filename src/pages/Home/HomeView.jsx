import React, { useEffect,useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import request from "../../utils/request";

import HomeSider from "@/components/HomeSider";
import HomeHeader from "@/components/HomeHeader";
import HomeContent from "@/components/HomeContent";
import HomeModel from "./HomeModel";
const store = new HomeModel();
const { Header, Content, Footer, Sider } = Layout;

import mockData from "../../assets/mock"


const HomeView = () => {

	const [contentList,setContentList] = useState([]);
	const [analysisList,setAnalysisList] = useState([]);

	const fetchData = async () => {
		await store.getAnalysis();
	};

	useEffect(() => {
		fetchData();
		setContentList(mockData.contentList);
		setAnalysisList(mockData.analysisList);
	}, []);

	const userData = {
		userName: "小明",
	};
	return (
		<Layout style={{ padding: "5px", borderRadius: "20px" }}>
			<HomeSider userInfo={userData} contentList={contentList} analysisList={analysisList} />
			<Layout>
				<HomeHeader store={store} />
				<HomeContent store={store} />
				<Footer
					style={{
						textAlign: "center",
					}}
				></Footer>
			</Layout>
		</Layout>
	);
};
export default observer(HomeView);
