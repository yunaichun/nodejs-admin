import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const FormModal = ({
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
				<FormItem label="Name" hasFeedback {...formItemLayout}>
					{getFieldDecorator('name', {
						initialValue: item.name,
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
