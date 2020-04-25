import './Login.css';
import React from 'react';
import { Layout, notification } from 'antd';
import LoginForm from '../components/LoginForm';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer, inject } from 'mobx-react';
import AuthStore from '../stores/auth.store';

interface Props extends RouteComponentProps {
	auth?: AuthStore;
}

@inject('auth')
@observer
class Login extends React.Component<Props> {
	onSubmit = (
		e: React.MouseEvent<HTMLFormElement>,
		values: {
			username: string;
			password: string;
			remember: boolean;
		}
	) => {
		// console.log(this.props)
		this.props.auth!
			.loginAsync(values.username, values.password)
			.then(() => {
				if (this.props.auth!.isAuth) {
					this.props.history.push('/');
				}
			})
			.catch((error) => {
				notification['error']({
					message: '登录失败',
					description: error.message
				});
			});
	};

	render() {
		const LayoutContent = Layout.Content;

		return (
			<Layout>
				<LayoutContent className="antd-pro-layouts-user-layout-container">
					<div className="antd-pro-layouts-user-layout-content">
						<div className="antd-pro-pages-user-login-style-main">
							<LoginForm onSubmit={this.onSubmit} />
						</div>
					</div>
				</LayoutContent>
			</Layout>
		);
	}
}

export default withRouter(Login);
