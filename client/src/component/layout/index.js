import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, message } from 'antd';
import '../../style/layout/layout.less';
import * as actionCreators from '../../redux/actions/index';
import LinkMenu from './linkmenu';
import PanelHeader from './panelHeader';

const { Content, Footer } = Layout;

class LayOut extends React.Component {
	constructor(props) {
		super(props);
		// 作用是访问到this.props和this.state
		this.onCollapse = this.onCollapse.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			collapsed: false,
		};
	}
	onCollapse(collapsed) {
		console.log(collapsed);
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}
	logout() {
		this.props.signout().then(data => {
			//异步获取redux store数据：返回的是提交的action
			if (data.payload.status === '200') {
				message.success(data.payload.msg, 2);
				// this.props.history.push('/login');
				window.location.hash = '#/login';
			} else {
				message.error(data.payload.msg, 2);
			}
		});
	}
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<LinkMenu collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
				<Layout>
					<PanelHeader collapsed={this.state.collapsed} onCollapse={this.onCollapse} logout={this.logout} />
					<Content className="layout-content">
						{this.props.children}
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(
	mapStateToProps,
	actionCreators
)(LayOut);
