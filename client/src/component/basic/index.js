import React from 'react';
import { Form } from 'antd';

import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑
import { SearchFilter } from './searchFilter';// 搜索筛选条件
import { TableList } from './table';// table

class Basic extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const form = this.props.form;
		return (
			<div>
				<Bcrumb title="当前天气" icon="cloud" />
				<SearchFilter form={form} />
				<TableList />
			</div>
		);
	}
}

export default Form.create()(Basic);
