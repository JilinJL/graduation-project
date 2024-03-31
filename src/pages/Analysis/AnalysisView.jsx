import React, { useEffect ,useRef } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Descriptions } from "antd";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import AnalysisModel from "./AnalysisModel";
import { useParams } from "react-router-dom";
import * as echarts from 'echarts';


const store = new AnalysisModel();
const AnalysisView = props => {

    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        let option = {
            series: [
              {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['40%', '75%'],
                radius: '100%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                  lineStyle: {
                    width: 6,
                    color: [
                        [0.125, "#FF0000"],
                        [0.250, "#FF4500"],
                        [0.375, "#FFA500"],
                        [0.500, "#FFD700"],
                        [0.625, "#FFFF00"],
                        [0.750, "#ADFF2F"],
                        [0.875, "#00FF00"],
                        [1.000, "#00EE00"]
                    ]                    
                  }
                },
                pointer: {
                  icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                  length: '12%',
                  width: 20,
                  offsetCenter: [0, '-60%'],
                  itemStyle: {
                    color: 'auto'
                  }
                },
                axisTick: {
                  length: 12,
                  lineStyle: {
                    color: 'auto',
                    width: 2
                  }
                },
                splitLine: {
                  length: 20,
                  lineStyle: {
                    color: 'auto',
                    width: 5
                  }
                },
                axisLabel: {
                  color: '#464646',
                  fontSize: 15,
                  distance: -50,
                  rotate: 'tangential',
                  formatter: function (value) {
                    if (value === 0.875) {
                      return '积极';
                    } else if (value === 0.125) {
                      return '消极';
                    }
                    return '';
                  }
                },
                title: {
                  offsetCenter: [0, '-10%'],
                  fontSize: 20
                },
                detail: {
                  fontSize: 30,
                  offsetCenter: [0, '-35%'],
                  valueAnimation: true,
                  formatter: function (value) {
                    return Math.round(value * 100) + '';
                  },
                  color: 'inherit'
                },
                data: [
                  {
                    value: 0.7,
                    name: 'score'
                  }
                ]
              }
            ]
          };
        myChart.setOption(option);
    }, []);


	const handleLogin = data => {
		console.log(data);
	};

	const handleRegister = data => {
		console.log(data);
	};

	const handleCheckName = data => {
		console.log(`用户名${data}重复`);
	};

	const items = [
		{
			label: "标题",
			children: "分析1",
            span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 2,
				xxl: 2,
			},
		},
		{
			label: "时间",
			children: "18:00:00",
            span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 2,
				xxl: 2,
			},
		},
		{
			label: "标签",
			children: "开心,快乐,喜悦",
            span: {
				xs: 1,
				md: 1,
				lg: 1,
				xl: 1,
				xxl: 2,
			},
		},
		{
			label: "内容",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 3,
			},
			children: (
				<>
					Data disk type: MongoDB
					<br />
					Database version: 3.4
					<br />
					Package: dds.mongo.mid
				</>
			),
		},

		{
			label: "分析结果",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 3,
			},
			children: (
				<>
					CPU: 6 Core 3.5 GHz
					<br />
					Storage space: 10 GB
					<br />
					Replication factor: 3
					<br />
					Region: East China 1
				</>
			),
		},
        {
			label: "可视化分析",
			span: {
				xs: 3,
				md: 3,
				lg: 3,
				xl: 3,
				xxl: 3,
			},
			children: (
                <div style={{
                    width: "400px",
                    height: "200px",

                }} ref={chartRef} id="chart-dom"></div>
			),
		},
	];

	console.log(useParams());

	return (
		<div
			style={{
				width: "80%",
			}}
		>
			<Descriptions
				title={store.analysis}
				bordered
				size='middle'
				column={{
					xs: 1,
					sm: 2,
					md: 3,
					lg: 3,
					xl: 3,
					xxl: 3,
				}}
				items={items}
			/>
		</div>
	);
};

export default observer(AnalysisView);
