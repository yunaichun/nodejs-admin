import React from 'react';
import { Table, Button } from 'antd';
import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	}, 
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		// sortOrder: 'descend', //升降序
		sorter: (a, b) => a.age - b.age, //排序函数
		filters: [
			{ text: '含有0', value: 0 },
			{ text: '含有1', value: 1 },
		],
		onFilter: (value, record) => record.address.includes(parseInt(value))
	}, 
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	}
];
const data = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		age: i,
		address: `London, Park Lane no. ${i}`,
	});
}

class TableList extends React.Component {
	constructor(props) {
		super(props);
		this.start = this.start.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.state = {
			selectedRowKeys: [], // Check here to configure the default column
			loading: false,
		};
	}
	onSelectChange(selectedRowKeys) {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}
	start() {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			this.setState({
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	}
	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		const pagination = {
			defaultCurrent: 1, //当前选中页
			// total: 50, //总数
			showQuickJumper: true, //快速跳转至某页
			showSizeChanger: true, //是否可以改变pageSize
			showTotal: total => `共 ${total} 条`//显示总条数
		};
		
		return (
			<div>
				<Bcrumb title="当前天气" icon="cloud" />
				<div style={{ marginBottom: 16 }}>
					<Button
						type="primary"
						onClick={this.start}
						disabled={!hasSelected}
						loading={loading}
					>
						Remove
					</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
					</span>
				</div>
				<Table 
					rowSelection={rowSelection} 
					pagination={pagination} 
					columns={columns} 
					dataSource={data} 
				/>
			</div>
		);
	}
}

export default TableList;
