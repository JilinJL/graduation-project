import { createContext, useContext } from "react";
import request from "../../utils/request";
import { makeObservable, observable, action, autorun, toJS } from "mobx";
import { message } from "antd";
import Utils from "../../utils/Utils";
import _ from "lodash"
class WordsCloudModel {
	contentList = [];
	loading = false;
	constructor() {
		makeObservable(this, {
			contentList: observable,
			loading: observable,
			getContent: action,
			touchLoading: action,
			stopLoading: action,
		});
	}

	async getContent(id) {
		try {
			// 获取用户的分析记录
			const { data } = await request({
				url: `content/getContentByUserId?userId=${id}`,
				method: "get",
			});

			this.contentList = _.sortBy(data.map(content => {
				return Object.assign(content, {
					key: content.id,
					label: content.contentTitle,
				});
			}),function(content){return -content.id});
			return data;
		} catch (e) {
			message.error(e.message);
		}
	}

	touchLoading() {
		this.loading = !this.loading;
	}

	stopLoading() {
		this.loading = false;
	}
}

export default WordsCloudModel;
