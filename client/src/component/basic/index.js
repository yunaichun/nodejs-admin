import React from 'react';
import { Form, Modal } from 'antd';

import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑
import { SearchFilter } from './searchFilter';// 搜索筛选条件
import { TableList } from './tableList';// table
import { FormModal } from './formModal';// modal

const confirm = Modal.confirm;

class Basic extends React.Component {
	constructor(props) {
		super(props);
		const that = this;
		this.state = {
			filterProps: {
				//search
				handleSubmit: this.handleSubmit.bind(this),
				//change
				handleChange: this.handleChange.bind(this),
				//reset
				handleReset: this.handleReset.bind(this),
				//create
				handleCreate: this.handleCreate.bind(this),
			},
			tableProps: {
				data: [],
				onMenuClick: this.onMenuClick.bind(this),
			},
			modalProps: {
				modalType: 'create',
				item: {}, //初始数据
				visible: false, //是否可见
				maskClosable: true, //点击蒙层是否可以关闭
				confirmLoading: false, //确定按钮loading状态
				wrapClassName: 'vertical-center-modal', //对话框外层容器的类名
				title: 'Create User', //标题
				onOk(data) { //点击确定回调
					delete data.nameFilter;
					delete data.addressFilter;
					delete data.timeFilter;
					if (that.state.modalProps.modalType === 'create') {
						that.handleSave(data);
					} else {
						that.handleUpdate(data);
					}
				},
				onCancel() { //点击遮罩层或右上角叉或取消按钮的回调
					console.log('onCancel');
					that.setState({
						modalProps: Object.assign({}, that.state.modalProps,
							{ 
								visible: false,
								item: {}, //清空表单
							}
						)
					});
				},
			}
		};
	}
	componentDidMount() {
		const data = [];
		for (let i = 0; i < 46; i++) {
			data.push({
				key: i,
				name: `Edward ${i}`,
				nickName: 'Edward',
				isMale: true,
				age: i,
				phone: '18888888888',
				email: 'xxx@qq.com',
				address: '陕西省 榆林市 佳县',
			});
		}
		this.setState({
			tableProps: Object.assign({}, this.state.tableProps, { data })
		});
	}
	// edit + delete
	onMenuClick(text, e) {
		console.log(text);
		if (e.key === 'update') {
			this.setState({
				modalProps: Object.assign({}, this.state.modalProps,
					{ 
						modalType: 'update',
						visible: true,
						title: 'Update User',
						item: text //初始数据
					}
				)
			});
		} else if (e.key === 'delete') {
			confirm({
				title: 'Are you sure delete this record?',
				onOk() { //确认删除
					console.log('删除成功:', text);
				},
			});
		}
	}
	//create
	handleCreate() {
		this.setState({
			modalProps: Object.assign({}, this.state.modalProps, 
				{ 
					modalType: 'create',
					visible: true, 
					title: 'Create User',
					item: {} 
				}
			)
		});
	}
	//save
	handleSave(data) {
		console.log('create:', data);
	}
	//update
	handleUpdate(data) {
		console.log('update:', data);
	}
	handleFields(fields) {
		const { createTime } = fields;
		if (createTime !== undefined && createTime.length) {
			fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')];
		}
		return fields;
	}
	//search
	handleSubmit() {
		const { getFieldsValue } = this.props.form;
		let fields = getFieldsValue();
		fields = this.handleFields(fields);
		console.log(fields);
	}
	//change
	handleChange(key, values) {
		const { getFieldsValue } = this.props.form;
		let fields = getFieldsValue();
		fields[key] = values;
		fields = this.handleFields(fields);
		console.log(fields);
	}
	//reset
	handleReset() {
		const { getFieldsValue, setFieldsValue } = this.props.form;
		const fields = getFieldsValue();
		for (let item in fields) {
			if ({}.hasOwnProperty.call(fields, item)) { //对象实例属性
				if (fields[item] instanceof Array) { //是数组置为空数组
					fields[item] = [];
				} else { //非数组置为undefined
					fields[item] = undefined;
				}
			}
		}
		setFieldsValue(fields);
		this.handleSubmit();
	}
	render() {
		const form = this.props.form;
		const filterProps = this.state.filterProps;
		const tableProps = this.state.tableProps;	
		const modalProps = this.state.modalProps;	
		return (
			<div>
				<Bcrumb title="案例" icon="cloud" />
				<SearchFilter form={form} {...filterProps} />
				<TableList {...tableProps} />
				<FormModal form={form} {...modalProps} />
			</div>
		);
	}
}

export default Form.create()(Basic);
