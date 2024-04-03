import React, { useEffect ,useRef } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme, Descriptions,Button } from "antd";
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
                    value: 0.85,
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
			children: "用户留言分析",
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
			children: "2024年3月31日 19:07",
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
				<div>满意、惊喜、推荐</div>
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
				<div style={{width: "70%"}}>
我购买了这个商品，完全超出了我的预期！首先，它的质量非常出色，每一个细节都经过精心设计和制造。其次，它的功能性非常强大，能够完美解决我的需求。无论是在家里还是在户外活动中，都能轻松携带并发挥出最佳效果。最让我感到惊喜的是，它的性价比非常高，价格实惠却不失品质。总的来说，我对这个商品非常满意，强烈推荐给所有有类似需求的朋友们！
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
			children: (
				<div style={{width: "70%",fontWeight: '700', color:"#101010"}}>
根据文本内容，可以看出用户对购买的商品感到非常满意和惊喜，表达了强烈的推荐意愿。情感值为0.85显示了这段评价是积极的，用户对商品的满意程度很高，体验带来了愉悦和满足的情绪。
				</div>
			),
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
				size='small'
				extra={<Button type="primary" >导出</Button>}
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
