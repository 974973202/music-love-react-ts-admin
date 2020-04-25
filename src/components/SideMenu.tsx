import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import AuthStore from '../stores/auth.store';

interface Props extends RouteComponentProps {
	auth?: AuthStore;
}

const SideMenu: React.SFC<Props> = (props) => {
	const onExit = () => {
		props.auth!.logoutAsync().then(() => {
			props.history.push('/login');
		});
	};

	return (
		<Menu theme="dark" mode="inline" selectedKeys={[ props.location.pathname ]}>
			<Menu.Item key="/">
				<Link to="/">
					<Icon type="user" />
					<span>首页 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/musicList">
				<Link to="/musicList">
					<Icon type="user" />
					<span>歌单管理 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/swiperList">
				<Link to="/swiperList">
					<Icon type="user" />
					<span>轮播图管理 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/blogList">
				<Link to="/blogList">
					<Icon type="user" />
					<span>博客管理 </span>
				</Link>
			</Menu.Item>
			<Menu.Item key="/about">
				<Link to="/about">
					<Icon type="message" />
					<span>关于</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="exit" onClick={onExit}>
				<Icon type="poweroff" />
				<span>退出</span>
			</Menu.Item>
		</Menu>
	);
};

export default withRouter(inject('auth')(observer(SideMenu)));
