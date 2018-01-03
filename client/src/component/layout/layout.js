import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, message } from 'antd';
import '../../style/layout/layout.less';
import * as actionCreators from '../../redux/actions/index';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

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
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
						<Menu.Item key="1">
							<Link to="/home">
								<Icon type="pie-chart" />
								<span>首页</span>
							</Link>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={<span><Icon type="user" /><span>User</span></span>}
						>
							<Menu.Item key="3">Tom</Menu.Item>
							<Menu.Item key="4">Bill</Menu.Item>
							<Menu.Item key="5">Alex</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.onCollapse}
						/>
						<Menu mode="horizontal" onClick={this.logout} className="layout-header-menu">
							<SubMenu title={<span><Icon type="user" />sosout</span>}>
								<Menu.Item key="logout">注销</Menu.Item>
							</SubMenu>
						</Menu>
					</Header>
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
