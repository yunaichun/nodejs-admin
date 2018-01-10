import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, message } from 'antd';

import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑
import { SearchFilter } from './searchFilter';// 搜索筛选条件
import { TableList } from './tableList';// table
import FormModal from './formModal';// modal

import * as actionCreators from '../../redux/actions/index';

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
				deleteAll: this.deleteAll.bind(this),
				// currentRow: [], //全部删除传递参数
			},
			modalProps: {
				modalType: 'create',
				item: {}, //初始数据
				visible: false, //是否可见
				maskClosable: false, //点击蒙层是否可以关闭
				confirmLoading: false, //确定按钮loading状态
				wrapClassName: 'vertical-center-modal', //对话框外层容器的类名
				title: 'Create User', //标题
				onOk(data) { //点击确定回调
					delete data.nameFilter;
					delete data.addressFilter;
					delete data.timeFilter;
					data.id = that.id;
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
		this.props.selecMockAll().then(data => {
			if (data.payload.status === '200') {
				this.setState({
					tableProps: Object.assign({}, this.state.tableProps, { data: data.payload.data.data })
				});
			}
		});
	}
	// edit + delete
	onMenuClick(text, e) {
		const that = this;
		that.id = text.id;
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

			//必须要重置表单，不然antdDesign的initinal value不起作用
			const { setFieldsValue } = that.props.form;
			const address = text.address ? text.address.split(' ') : [];
			const item = Object.assign({}, text, { address });
			setFieldsValue(item);
		} else if (e.key === 'delete') {
			confirm({
				title: 'Are you sure delete this record?',
				onOk() { //确认删除
					console.log('删除成功:', text);
					const id = text.id;
					that.props.deleteMockOne(id, 'bbb').then(data => {
						if (data.payload.status === '200') {
							that.setState({
								tableProps: Object.assign({}, that.state.tableProps, { data: data.payload.data.data })
							});
							message.success(data.payload.msg, 2);
						}
					});
				},
			});
		}
	}
	//deleteAll
	deleteAll(params) {
		this.props.deleteMockAll(params.currentRow).then(data => {
			if (data.payload.status === '200') {
				this.setState({
					tableProps: Object.assign({}, this.state.tableProps, { data: data.payload.data.data })
				});
			}
		});
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

		//必须要重置表单，不然antdDesign的initinal value不起作用
		this.handleReset();
	}
	//save
	handleSave(addItem) {
		const that = this;
		console.log('update:', addItem);
		that.props.addMockOne(addItem).then(data => {
			if (data.payload.status === '200') {
				message.success(data.payload.msg, 2);
				that.setState({
					tableProps: Object.assign({}, that.state.tableProps, { data: data.payload.data.data }),
					modalProps: Object.assign({}, that.state.modalProps,
						{ 
							visible: false,
							item: {}, //清空表单
						}
					)
				});
			}
		});
	}
	//update
	handleUpdate(editItem) {
		const that = this;
		console.log('update:', editItem);
		that.props.editMockOne(editItem).then(data => {
			if (data.payload.status === '200') {
				//成功返回状态
				message.success(data.payload.msg, 2);
				that.setState({
					tableProps: Object.assign({}, that.state.tableProps, { data: data.payload.data.data }),
					modalProps: Object.assign({}, that.state.modalProps,
						{ 
							visible: false,
							item: {}, //清空表单
						}
					)
				});
			}
		});
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
		this.props.selecMockAll(fields).then(data => {
			if (data.payload.status === '200') {
				this.setState({
					tableProps: Object.assign({}, this.state.tableProps, { data: data.payload.data.data })
				});
			}
		});
	}
	//change
	handleChange(key, values) {
		const { getFieldsValue } = this.props.form;
		let fields = getFieldsValue();
		fields[key] = values;
		fields = this.handleFields(fields);
		this.props.selecMockAll(fields).then(data => {
			if (data.payload.status === '200') {
				this.setState({
					tableProps: Object.assign({}, this.state.tableProps, { data: data.payload.data.data })
				});
			}
		});
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
	}
	render() {
		const form = this.props.form;
		const filterProps = this.state.filterProps;
		const tableProps = this.state.tableProps;	
		const modalProps = this.state.modalProps;	
		return (
			<div>
				<Bcrumb title="Mock" icon="table" />
				<SearchFilter form={form} {...filterProps} />
				<TableList {...tableProps} />
				<FormModal form={form} {...modalProps} />
			</div>
		);
	}
}

const BasicModule = Form.create()(Basic);

function mapStateToProps(state) {
	return state;
}

export default connect(
	mapStateToProps,
	actionCreators
)(BasicModule);
