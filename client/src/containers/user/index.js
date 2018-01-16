import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, message } from 'antd';

import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑
import { SearchFilter } from './searchFilter';// 搜索筛选条件
import { TableList } from './tableList';// table
import FormModal from './formModal';// modal

import * as actionCreators from '../../redux/actions/index';
import { globalVars } from '../../util/config';

const baseDomain = globalVars.baseDomain;
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
				//import
				handleImport: this.handleImport.bind(this),
				//export
				handleExport: this.handleExport.bind(this)
			},
			tableProps: {
				data: [],
				onMenuClick: this.onMenuClick.bind(this),
				deleteUs: this.deleteUs.bind(this),
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
					if (that.state.modalProps.modalType === 'create') {
						that.handleSave(data);
					} else {
						data.id = that.id;
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
		this.props.selectUs().then(data => {
			if (data.payload.status === '200') {
				this.setState({
					tableProps: Object.assign({}, this.state.tableProps, { data: data.payload.data })
				});
			}
		});
	}
	// edit + delete
	onMenuClick(text, e) {
		const that = this;
		that.id = text._id;
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
					const id = text._id;
					that.props.deleteU(id).then(data => {
						if (data.payload.status === '200') {
							that.setState({
								tableProps: Object.assign(
									{}, 
									that.state.tableProps, 
									{ data: that.props.userReducer.data }
								)
							});
							message.success(data.payload.msg, 2);
						}
					});
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

		//必须要重置表单，不然antdDesign的initinal value不起作用
		this.handleReset();
	}
	//save
	handleSave(addItem) {
		const that = this;
		console.log('add:', addItem);
		that.props.insertU(addItem).then(data => {
			if (data.payload.status === '200') {
				message.success(data.payload.msg, 2);
				that.setState({
					tableProps: Object.assign({}, that.state.tableProps, { data: that.props.userReducer.data }),
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
		that.props.updateU(editItem).then(data => {
			if (data.payload.status === '200') {
				//成功返回状态
				message.success(data.payload.msg, 2);
				that.setState({
					tableProps: Object.assign({}, that.state.tableProps, { data: that.props.userReducer.data }),
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
	//import
	handleImport(event) {
		const formData = new FormData();
		const file = event.target.files[0];
        formData.append('uploadFile', file);
        const that = this;
		that.props.importUs(formData).then(data => {
			if (data.payload.data.status === '200') {
				//成功返回状态
				message.success('导入成功', 2);
				that.setState({
					tableProps: Object.assign(
						{}, 
						that.state.tableProps, 
						{ data: that.props.userReducer.data }
					),
				});
			} else {
				message.error('导入失败，已经存在相同用户！', 2);
			}
		});
	}
	//export
	handleExport() {
		const that = this;
		that.props.exportUs().then(data => {
			if (data.payload.status === 200) {
				window.open(`${baseDomain}/exportUsers`);
				//成功返回状态
				message.success('导出成功！', 2);
			} else {
				message.error('导出失败！', 2);
			}
		});
	}
	//deleteUs
	deleteUs(params) {
		const that = this;
		const ids = [];
		const selectedItems = params.currentRow;
		for (let i = 0, legth = selectedItems.length; i < legth; i++) {
			ids.push(selectedItems[i]._id);
		}
		this.props.deleteUs(ids).then(data => {
			if (data.payload.data.status === '200') {
				message.success('批量删除成功', 2);
				that.setState({
					tableProps: Object.assign(
						{}, 
						that.state.tableProps, 
						{ data: that.props.userReducer.data }
					),
				});
			}
		});
	}
	render() {
		const form = this.props.form;
		const filterProps = this.state.filterProps;
		const tableProps = this.state.tableProps;	
		const modalProps = this.state.modalProps;	
		return (
			<div>
				<Bcrumb title="User" icon="user" />
				<SearchFilter {...filterProps} form={form} />
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
