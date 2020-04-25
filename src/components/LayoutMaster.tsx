import React from 'react';
import { Layout, Icon } from 'antd';
import './LayoutMaster.css';
import SideMenu from './SideMenu';

const LayoutMaster: React.SFC = (props) => {
	const [ collapsed, setCollapsed ] = React.useState(false);
	const { Header, Sider, Footer } = Layout;

	return (
		<Layout className="components-layout-demo-custom-trigger" style={{ minHeight: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="logo" >个人云音乐管理后台</div>
				<SideMenu />
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<Icon
						className="trigger"
						type={collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={() => setCollapsed(!collapsed)}
					/>
				</Header>
				{props.children}
				<Footer style={{ textAlign: 'center' }}>个人云音乐管理后台</Footer>
			</Layout>
		</Layout>
	);
};

export default LayoutMaster;
