import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { useNavigate, Link,NavLink  } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import request from "../../utils/request";
import HomeModel from "@/pages/Home/HomeModel";
const store = new HomeModel();

// 分析条目设置
const AnalysisTags = props => {
	
	const handleDelete = e => {
		e.preventDefault();
	};

	const confirm =async e => {
		e.preventDefault();
		const {data} = await request({
			url: `content/deleteContent`,
			method: 'delete',
			params: {
				userId: localStorage.getItem('userId'),
				contentId: props?.data?.id,
			}
		  });
		  if(data){
			message.success("删除成功");
			// location.reload()
			props.setContentList(props.contentList.filter(c=>c.id!=props?.data?.id))
		  }else{
			message.error("删除失败,请稍后重试");
		  }
	};
	const cancel = e => {
		e.preventDefault();
	};

	return (
		<div id='sider-item' key={props?.data?.id}>
			<div className='link' title={props?.data?.contentTitle}>
				<Link unstable_viewTransition to={`/analysis/${props?.data?.id}`}>{props?.data?.contentTitle}</Link >
			</div>
			<div className='delete'>
				<Popconfirm title='删除记录' description='确认要删除本条记录吗?' onConfirm={confirm} onCancel={cancel} okText='Yes' cancelText='No'>
					<DeleteOutlined />
				</Popconfirm>
			</div>
		</div>
	);
};

export default AnalysisTags;
