import React from 'react';
import { Form, Input, Modal, Select, Button, Upload, Icon, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const FormModal = ({
	catetories = [],
	item = {},
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
	return (
		<Modal {...modalOpts} >
			<Form layout="horizontal">
				<FormItem label="Catetory" hasFeedback {...formItemLayout}>
					{getFieldDecorator('catetory._id', {
						initialValue: item.catetory,
						rules: [
							{ required: true, message: 'Please select catotory!' },
						],
					})(
					<Select placeholder="Please select a country">
						{ catetories.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>) }
					</Select>
					)}
				</FormItem>
				<FormItem label="Title" hasFeedback {...formItemLayout}>
					{getFieldDecorator('title', {
						initialValue: item.title,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Doctor" hasFeedback {...formItemLayout}>
					{getFieldDecorator('doctor', {
						initialValue: item.doctor,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Language" hasFeedback {...formItemLayout}>
					{getFieldDecorator('language', {
						initialValue: item.language,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Country" hasFeedback {...formItemLayout}>
					{getFieldDecorator('country', {
						initialValue: item.country,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Summary" hasFeedback {...formItemLayout}>
					{getFieldDecorator('summary', {
						initialValue: item.summary,
						rules: [
							{ required: true, },
						],
					})(<TextArea rows={6} />)}
				</FormItem>
				<FormItem label="Flash" hasFeedback {...formItemLayout}>
					{getFieldDecorator('flash', {
						initialValue: item.flash,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Upload" hasFeedback {...formItemLayout}>
					{getFieldDecorator('poster', {
						initialValue: 'http://localhost:3000/' + item.poster,
						rules: [
							{ required: true, },
						],
					})(
					<Upload name="logo" listType="picture">
						<Button>
							<Icon type="upload" /> Click to upload
						</Button>
					</Upload>
					)}
				</FormItem>
				<FormItem label="Year" hasFeedback {...formItemLayout}>
					{getFieldDecorator('year', 
					{ 
						initialValue: item.year,
						rules: [
							{ required: true, },
						],
					})(<InputNumber min={1900} max={2050} />)}
				</FormItem>
				<FormItem label="PV" hasFeedback {...formItemLayout}>
					{getFieldDecorator('pv', {
						initialValue: item.pv,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
			</Form>
		</Modal>
	);
};

export default Form.create()(FormModal);
