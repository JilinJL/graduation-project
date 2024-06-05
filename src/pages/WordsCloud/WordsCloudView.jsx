import { observer } from "mobx-react";
import { Button, Transfer } from "antd";
import React, { useEffect, useState,useRef } from "react";
import { useLocation } from "react-router-dom";
import { toJS } from "mobx";
import "./WordsCloudStyle.less";
import WordsCloudModel from "./WordsCloudModel";
import { Segment, useDefault } from "segmentit";
import Utils from "../../utils/Utils";
import 'echarts-wordcloud'
import * as echarts from 'echarts';

const store = new WordsCloudModel();
const WordsCloudView = props => {
	const location = useLocation();
	const [contentData, setContentData] = useState([]);
	const [contentIdList, setContentIdList] = useState([]);
	const [targetKeys, setTargetKeys] = useState([]);
	const [wordCloud, setWordCloud] = useState([]);
    const [option,setOption] = useState({})
	const chartRef = useRef(null);
	const fetchData = async () => {
		await store.getContent(localStorage.getItem("userId") || null);
	};
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		setContentData(toJS(store.contentList));
	}, [store.contentList]);

	const handleChange = newTargetKeys => {
		console.log(newTargetKeys);
		setContentIdList(newTargetKeys);
		setTargetKeys(newTargetKeys);
	};
	const handleSearch = (dir, value) => {};

	const handleSubmit = () => {
		store.touchLoading();
		let list = [];
		list = contentData.filter(content => {
			if (contentIdList.includes(content.id)) return content;
		});

		let text = list.reduce((pre, cur, index) => {
			console.log(cur.contentData);
			return pre + cur.contentData;
		}, "");
		const segmentit = useDefault(new Segment());
		const result = segmentit.doSegment(text);
		setWordCloud(Utils.countValue(result));
        const option = {
            series: [
                {
                    type: "wordCloud",
                    gridSize: 2,
                    sizeRange: [12, 50],
                    rotationRange: [-90, 90],
                    shape: "pentagon",
                    textStyle: {
                        normal: {
                            color: function () {
                                return "rgb(" + [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)].join(",") + ")";
                            },
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: "#333",
                        },
                    },
                    data: wordCloud,
                },
            ],
        };
        setTimeout(() => {
            setOption(option)
            store.stopLoading()
        },1000)
	};

useEffect(()=>{
    let myChart = echarts.init(chartRef.current);
    myChart.setOption(option);
},[option])
	return (
		<div id='content'>
			<div id='edit'>
				<Transfer
					dataSource={contentData}
					showSearch
					targetKeys={targetKeys}
					onChange={handleChange}
					onSearch={handleSearch}
					listHeight={600}
					render={item => item.label}
					oneWay
				/>
				<div>
					<Button loading={store.loading} onClick={handleSubmit} disabled={!contentIdList.length}>
						生成词云图
					</Button>
				</div>
					<div style={{width: '400px',height: '400px'}}  id='chart' ref={chartRef}>
					</div>
			</div>

			
			<div id='export'>{Boolean(contentIdList.length)&&<Button>导出</Button>}</div>

		</div>
	);
};

export default observer(WordsCloudView);
