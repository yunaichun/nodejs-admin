import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const FormModal = ({
	item = { movie: '5a3212249818ad0fe20c6c08' },
	movies = [],
	users = [], 
	onOk,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
	...modalProps
}) => {
	const handleOk = () => { //form表单提交校验
		validateFields((errors) => {
			if (errors) {
				return;
			}
			const data = { 
				...getFieldsValue(),
				key: item.key,
			};
			onOk(data);
		});
	};
	//模态框配置
	const modalOpts = {
		...modalProps,
		onOk: handleOk,
	};
	//表单样式
	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};
	//回复框样式
	const show = modalOpts.modalType === 'update' ? 'block' : 'none';
	const replyStyle = {
		display: show,
		fontSize: 85
	};
	return (
		<Modal {...modalOpts} >
			<Form layout="horizontal">
				<FormItem label="Movie" hasFeedback {...formItemLayout}>
					{getFieldDecorator('movie', {
						initialValue: localStorage.getItem('movieId'),
						rules: [
							{ required: true },
						],
					})(
					<Select placeholder="disabled movie name" disabled>
						{ movies.map(item => <Option key={item._id} value={item._id}>{item.title}</Option>) }
					</Select>
					)}
				</FormItem>
				<FormItem label="From" hasFeedback {...formItemLayout}>
					{getFieldDecorator('from._id', {
						initialValue: item.from,
						rules: [
							{ required: true, message: 'Please select catotory!' },
						],
					})(
					<Select placeholder="Please select a user" disabled={modalOpts.modalType === 'update'}>
						{ users.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>) }
					</Select>
					)}
				</FormItem>
				<FormItem label="Content" hasFeedback {...formItemLayout}>
					{getFieldDecorator('content', {
						initialValue: item.content,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Reply" {...formItemLayout} style={replyStyle}>
					{getFieldDecorator('reply', {
						initialValue: item.reply
					})(<Input />)}
				</FormItem>
			</Form>
		</Modal>
	);
};

export default Form.create()(FormModal);
