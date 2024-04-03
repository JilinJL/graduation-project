import React, { useState, useEffect, useCallback } from "react";
import "./index.less";
import Utils from "../../utils/Utils";
import { useNavigate, Link,NavLink  } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";

// 分析条目设置
const AnalysisTags = props => {
	const handleDelete = e => {
		e.preventDefault();
		console.log("删除", e);
	};

	const confirm = e => {
		e.preventDefault();
		message.success("删除成功");
	};
	const cancel = e => {
		e.preventDefault();
	};

	return (
		<div id='sider-item' key={props.id}>
			<div className='link' title={props.title}>
				<NavLink activeClassName="active" to={`/analysis/${props.id}`}>{props.title}</NavLink >
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
