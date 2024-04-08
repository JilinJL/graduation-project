import React, { useEffect,useState,useRef } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Tour } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import request from "../../utils/request";
import {useSearchParams} from "react-router-dom"
import HomeSider from "@/components/HomeSider";
import HomeHeader from "@/components/HomeHeader";
import HomeContent from "@/components/HomeContent";
import HomeModel from "./HomeModel";
const store = new HomeModel();
const { Header, Content, Footer, Sider } = Layout;


const HomeView = () => {

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const [open, setOpen] = useState(false);
	const steps = [
	  {
		title: '第一步',
		description: '新建一条记录',
		cover: (
		  <img
			alt="第一步.png"
			src="https://gitee.com/jilinJL/my-pictures/raw/master/img/first.png"
		  />
		),
		target: () => ref1.current,
	  },
	  {
		title: '第二步',
		description: '选择模型类型,编辑标题,输入需要分析的内容',
		target: () => ref2.current,
	  },
	  {
		title: '第三步',
		description: '得到分析结果',
		target: () => ref3.current,
	  },
	];

	const [search,setsearch] = useSearchParams()
	useEffect(() => {
		console.log(search.get('title'))
    },[search.get('title')])

	// 处理提交分析请求
	const handleSubmit=async data=>{
		let params = {
			contentData: data?.textData,
			contentTime: new Date(),
			contentTitle: data?.title,
			type: data?.type,
			userId: localStorage.getItem("userId")
		}

		await store.addContent(params)
	}

	const [contentList,setContentList] = useState([]);

	// 统一初始化
	const fetchData = async () => {
		await store.getContent(localStorage.getItem('userId') || null);
		// await store.getUserInfo(localStorage.getItem('userId') || null)
	};

	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() =>{
		setContentList(toJS(store.contentList));
	}, [store.contentList])

	const userData = {
		userName: "小明",
	};
	return (
		<Layout style={{ padding: "5px", borderRadius: "20px"}}>
			<HomeSider userInfo={userData} 
			setContentList={setContentList}
			contentList={contentList}
			ref1={ref1}
			/>
			<Layout style={{backgroundColor: '#ffffff'}}>
				<HomeHeader store={store} setOpen={setOpen}/>
				
				<HomeContent ref2={ref2} newData={{title: search.get('title'),type: search.get('type')}} handleSubmit={handleSubmit} store={store} />
{/* 				<Footer
					style={{
						textAlign: "center",
					}}
				>
				
				</Footer> */}
			</Layout>
			<Tour open={open} onClose={() => setOpen(false)} steps={steps} />

		</Layout>
	);
};
export default observer(HomeView);
