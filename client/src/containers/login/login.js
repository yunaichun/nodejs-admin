import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import * as actionCreators from '../../redux/actions/index';
import '../../style/login/login.less';

const FormItem = Form.Item;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		if (e.keyCode === undefined || e.keyCode === 13) {
			this.props.form.validateFields((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);
					this.props.login(values.userName, values.password).then(data => {
						//异步获取redux store数据：返回的是提交的action
						console.log('异步获取redux store数据:', data);
						if (data.payload.status === '200') {
							message.success(data.payload.msg, 2);
							sessionStorage.setItem('user', values.userName);
							this.props.history.push('/home');
						} else {
							message.error(data.payload.msg, 2);
						}
					});
				}
			});
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem hasFeedback>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: 'Please input your username!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</FormItem>
					<FormItem hasFeedback>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }],
						})(
							<Input onKeyUp={this.handleSubmit} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						<a className="login-form-forgot" href="">Forgot password</a>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						Or <a href="">register now!</a>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const LoginForm = Form.create()(Login);

function mapStateToProps(state, ownProps) {
	console.log('mapStateToProps的sate值:', state);
	console.log('mapStateToProps的ownProps值:', ownProps);
	return state;
}

export default connect(
	mapStateToProps,
	actionCreators
)(LoginForm);

