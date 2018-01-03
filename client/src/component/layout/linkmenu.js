import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function LinkMenu(props) {
	return (
		<Sider
			collapsible
			collapsed={props.collapsed}
			onCollapse={props.onCollapse}
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
	);
}

export default LinkMenu;
