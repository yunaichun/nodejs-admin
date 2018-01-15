import React from 'react';
import { Table, Button, Dropdown, Icon, Menu, Popconfirm } from 'antd';

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
		this.props.deleteMovs(params);
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
				title: 'ID',
				dataIndex: '_id',
				key: '_id',
			},
			{
				title: 'Catetory',
				dataIndex: 'catetory.name',
				key: 'catetory.name',
			}, 
			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
			}, 
			{
				title: 'Doctor',
				dataIndex: 'doctor',
				key: 'doctor',
			}, 
			{
				title: 'Language',
				dataIndex: 'language',
				key: 'language',
			},
			{
				title: 'Country',
				dataIndex: 'country',
				key: 'country',
			},
			{
				title: 'Summary',
				dataIndex: 'summary',
				key: 'summary',
			},
			{
				title: 'Flash',
				dataIndex: 'flash',
				key: 'flash',
			},
			{
				title: 'Poster',
				dataIndex: 'poster',
				key: 'poster',
				render: (text) => {
					return `http://localhost:3000/${text}`;
				}
			},
			{
				title: 'Year',
				dataIndex: 'year',
				key: 'year',
			},
			{
				title: 'PV',
				dataIndex: 'pv',
				key: 'pv',
			},
			{
				title: 'Create',
				dataIndex: 'meta.createAt',
				key: 'meta.createAt',
			},
			{
				title: 'Update',
				dataIndex: 'meta.updateAt',
				key: 'meta.updateAt',
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
					<Popconfirm 
						title={'Are you sure delete these items?'} 
						placement="left" 
						onConfirm={() => this.start(this.state)}
					>
						<Button type="danger" size="large" style={{ marginLeft: 8 }} disabled={!hasSelected} loading={loading}>
							Remove
						</Button>
					</Popconfirm>
					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
					</span>
				</div>
				<Table 
					rowSelection={rowSelection} 
					pagination={pagination} 
					columns={columns} 
					dataSource={data} 
					rowKey="uid"
				/>
			</div>
		);
	}
}
