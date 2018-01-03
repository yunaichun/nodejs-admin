import React from 'react';
import { Menu, Layout, Icon } from 'antd';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

function PanelHeader(props) {
	return (
		<Header style={{ background: '#fff', padding: 0 }}>
			<Icon
				className="trigger"
				type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
				onClick={props.onCollapse}
			/>
			<Menu mode="horizontal" onClick={props.logout} className="layout-header-menu">
				<SubMenu title={<span><Icon type="user" />sosout</span>}>
					<Menu.Item key="logout">注销</Menu.Item>
				</SubMenu>
			</Menu>
		</Header>
	);
}

export default PanelHeader;
