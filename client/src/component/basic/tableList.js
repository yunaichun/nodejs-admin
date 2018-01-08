import React from 'react';
import { Table, Button, Dropdown, Icon, Menu } from 'antd';

export class TableList extends React.Component {
	constructor(props) {
		super(props);
		this.start = this.start.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.state = {
			selectedRowKeys: [], // Check here to configure the default column
			loading: false,
		};
	}
	onSelectChange(selectedRowKeys, currentRow) {
		console.log('selectedRowKeys changed: ', selectedRowKeys, currentRow);
		this.setState({ selectedRowKeys, currentRow });
	}
	//全部删除
	start(params) {
		this.props.deleteAll(params);
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


		//获取分页数据
		const { data, onMenuClick } = this.props;
		//设置分页信息
		const pagination = {
			defaultCurrent: 1, //当前选中页
			// total: 50, //总数
			showQuickJumper: true, //快速跳转至某页
			showSizeChanger: true, //是否可以改变pageSize
			showTotal: total => `共 ${total} 条`//显示总条数
		};
		//设置表头信息
		const columns = [
			{
				title: 'Avatar',
				dataIndex: 'avatar',
				key: 'avatar',
				width: 64,
				render: text => <img alt={'avatar'} width={24} src={text} />,
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			}, 
			{
				title: 'NickName',
				dataIndex: 'nickName',
				key: 'nickName',
			}, 
			{
				title: 'Gender',
				dataIndex: 'isMale',
				key: 'isMale',
				render: text => (
					<span>
					{text ? 'Male' : 'Female'}
					</span>
				),
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
				title: 'Phone',
				dataIndex: 'phone',
				key: 'phone',
			}, 
			{
				title: 'E-mail',
				dataIndex: 'email',
				key: 'email',
			}, 
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: 'Operation',
				key: 'operation',
				width: 100,
				render: (text) => {
					const menuOptions = [
						{ key: 'update', name: 'Update' },
						{ key: 'delete', name: 'Delete' }
					];
					const menu = menuOptions.map(item => 
						<Menu.Item key={item.key}>{item.name}</Menu.Item>
					);
					return (
						<Dropdown
						overlay={<Menu onClick={e => onMenuClick(text, e)}>{menu}</Menu>}
						>
							<Button style={{ border: 'none' }}>
								<Icon style={{ marginRight: 2 }} type="bars" />
								<Icon type="down" />
							</Button>
						</Dropdown>
					);
				},
			}
		];
		return (
			<div>
				<div style={{ marginBottom: 16 }}>
					<Button
						type="danger"
						onClick={() => this.start(this.state)}
						disabled={!hasSelected}
						loading={loading}
					>
						RemoveAll
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
