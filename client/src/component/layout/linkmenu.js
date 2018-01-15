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
						<Icon type="home" />
						<span>Home</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="basic">
					<Link to="/basic">
						<Icon type="table" />
						<span>Mock</span>
					</Link>
				</Menu.Item>
				<SubMenu
					key="github"
					title={<span><Icon type="github" /><span>Movie</span></span>}
				>
					<Menu.Item key="user">
						<Link to="/user">
							<Icon type="user" />
							<span>User</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="catetory">
						<Link to="/catetory">
							<Icon type="database" />
							<span>Catetory</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="movie">
						<Link to="/movie">
							<Icon type="video-camera" />
							<span>Movie</span>
						</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default LinkMenu;
