import React from 'react';
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd';
import city from './city';

const FormItem = Form.Item;

export class FormModal extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { getFieldDecorator, validateFields, getFieldsValue } = this.props.form;
		const modalProps = this.props;
		const item = modalProps.item;//初始数据
		const handleOk = () => { //form表单提交校验
			validateFields((errors) => {
				if (errors) {
					return;
				}
				const data = { ...getFieldsValue() };
				data.address = data.address.join(' ');
				modalProps.onOk(data);
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
					<FormItem label="Name" hasFeedback {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [
								{ required: true, },
							],
						})(<Input />)}
					</FormItem>
				<FormItem label="NickName" hasFeedback {...formItemLayout}>
					{getFieldDecorator('nickName', {
						initialValue: item.nickName,
						rules: [
							{ required: true, },
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Gender" hasFeedback {...formItemLayout}>
					{getFieldDecorator('isMale', {
						initialValue: item.isMale,
						rules: [
							{ required: true, type: 'boolean', },
						],
					})(
						<Radio.Group>
							<Radio value>Male</Radio>
							<Radio value={false}>Female</Radio>
						</Radio.Group>
					)}
				</FormItem>
				<FormItem label="Age" hasFeedback {...formItemLayout}>
					{getFieldDecorator('age', {
						initialValue: item.age,
						rules: [
							{ required: true, type: 'number', },
						],
					})(<InputNumber min={18} max={100} />)}
				</FormItem>
				<FormItem label="Phone" hasFeedback {...formItemLayout}>
					{getFieldDecorator('phone', {
						initialValue: item.phone,
						rules: [
							{
								required: true,
								pattern: /^1[34578]\d{9}$/,
								message: 'The input is not valid phone!',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="E-mail" hasFeedback {...formItemLayout}>
					{getFieldDecorator('email', {
						initialValue: item.email,
						rules: [
							{
								required: true,
								pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
								message: 'The input is not valid E-mail!',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Address" hasFeedback {...formItemLayout}>
					{getFieldDecorator('address', {
						initialValue: item.address && item.address.split(' '),
						rules: [
							{ required: true, },
						],
					})(<Cascader
						size="large"
						style={{ width: '100%' }}
						options={city}
						placeholder="Pick an address"
					/>)}
				</FormItem>
				</Form>
			</Modal>
		);
	}
}
