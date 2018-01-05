import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function LinkMenu(props) {
	const hash = window.location.hash.split('/');
	const defaultSelectedKey = [
		hash[hash.length - 1].split('?')[0] || 'home'
	];
	return (
		<Sider
			collapsible
			collapsed={props.collapsed}
			onCollapse={props.onCollapse}
		>
			<div className="logo">
				<img alt="logo" src="http://cdn.taofangdd.com/FvJSSx8lTrnGLyoS64a7NPUSKz0i" />
				<span>AntD Admin</span>
			</div>
			<Menu theme="dark" defaultSelectedKeys={defaultSelectedKey} mode="inline">
				<Menu.Item key="home">
					<Link to="/home">
						<Icon type="pie-chart" />
						<span>首页</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="basic">
					<Link to="/basic">
						<Icon type="pie-chart" />
						<span>案例</span>
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
	);
}

export default LinkMenu;
