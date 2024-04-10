import React, { useEffect, useRef, useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Descriptions, Button, Tag } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import AnalysisModel from "./AnalysisModel.js";
import { useParams } from "react-router-dom";
import * as echarts from "echarts";
import Utils from "@/utils/Utils";

const store = new AnalysisModel();
const AnalysisView = props => {
	const chartRef = useRef(null);
	const [analysisData, setAnalyisisData] = useState({});
	const { analysisId: id } = useParams(); // 获取路由参数中的ID
	const [option, setOption] = useState({});

	// 统一初始化
	const fetchData = async () => {
		await store.getAnalysis(id || null);
	};


	useEffect(() => {
		fetchData();
	}, [id]);


	// 存储analysis详情
	useEffect(() => {
		setAnalyisisData(toJS(store.analysisData));
	}, [store.analysisData]);

	// 初始化echarts实例
	useEffect(() => {
		let myChart = echarts.init(chartRef.current);

		// 实例配置部分用toJS(store.analysisData)获取最新数据
		myChart.setOption({
			series: [
				{
					type: "gauge",
					startAngle: 180,
					endAngle: 0,
					center: ["40%", "75%"],
					radius: "100%",
					min: 0,
					max: 1,
					splitNumber: 8,
					axisLine: {
						lineStyle: {
							width: 6,
							color: [
								[0.125, "#FF0000"],
								[0.25, "#FF4500"],
								[0.375, "#FFA500"],
								[0.5, "#FFD700"],
								[0.625, "#FFFF00"],
								[0.75, "#ADFF2F"],
								[0.875, "#00FF00"],
								[1.0, "#00EE00"],
							],
						},
					},
					pointer: {
						icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
						length: "12%",
						width: 20,
						offsetCenter: [0, "-60%"],
						itemStyle: {
							color: "auto",
						},
					},
					axisTick: {
						length: 12,
						lineStyle: {
							color: "auto",
							width: 2,
						},
					},
					splitLine: {
						length: 20,
						lineStyle: {
							color: "auto",
							width: 5,
						},
					},
					axisLabel: {
						color: "#464646",
						fontSize: 15,
						distance: -50,
						rotate: "tangential",
						formatter: function (value) {
							if (value === 0.875) {
								return "积极";
							} else if (value === 0.125) {
								return "消极";
							}
							return "";
						},
					},
					title: {
						offsetCenter: [0, "-10%"],
						fontSize: 20,
					},
					detail: {
						fontSize: 30,
						offsetCenter: [0, "-35%"],
						valueAnimation: true,
						formatter: function (value) {
							return Math.round(value * 100) + "";
						},
						color: "inherit",
					},
					data: [
						{
							value: toJS(store.analysisData)?.analysisScore,
							name: "score",
						},
					],
				},
			],
		});

		// 组件卸载时销毁echarts实例，避免内存泄漏
		return () => {
			myChart.dispose();
		};
	}, [store.analysisData]);


	const items = [
		{
			label: "标题",
			children: <div style={{ color: "#125124", fontSize: "1.2rem" }}>{analysisData?.contentTitle}</div>,
			span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 1,
				xxl: 1,
			},
		},
		{
			label: "时间",
			children: <div>{analysisData?.contentTime}</div>,
			span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 1,
				xxl: 1,
			},
		},
		{
			label: "标签",
			children: (
				<div>
					{analysisData?.analysisLabel?.split(",").map((label, index) => (
						<Tag style={{fontSize: '0.8rem'}} key={index} color={Utils.getRandomColor(analysisData?.analysisScore)}>
							{label}
						</Tag>
					))}
				</div>
			),
			span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 1,
				xxl: 4,
			},
		},
		{
			label: "内容",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 6,
			},
			children: (
				<div
					style={{
						width: window.innerWidth <= 800 ? "70%" : "100%",
						fontSize: window.innerWidth <= 800 ? "70%" : "100%",
					}}
				>
					{analysisData?.contentData}
				</div>
			),
		},

		{
			label: "分析结果",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 6,
			},
			children: <div style={{ width: window.innerWidth <= 800 ? "70%" : "100%", fontWeight: "700", color: "#101010" }}>{analysisData?.analysisResult}</div>,
		},
		{
			label: "可视化分析",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 6,
			},
			children: (
				<div
					style={{
						width: "400px",
						height: "200px",
					}}
					ref={chartRef}
					id='chart-dom'
				></div>
			),
		},
	];

	return (
		<div
			style={{
				width: "80%",
			}}
		>
			<Descriptions
				title={store.analysis}
				bordered
				size='small'
				extra={<Button type='primary'>导出</Button>}
				column={{
					xs: 1,
					sm: 1,
					md: 3,
					lg: 3,
					xl: 3,
					xxl: 6,
				}}
				items={items}
			/>
		</div>
	);
};

export default observer(AnalysisView);
