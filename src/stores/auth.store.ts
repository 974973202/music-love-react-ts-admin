import { observable, action, runInAction } from 'mobx';
import apiService from '../services/api.service';

export default class AuthStore {
	@observable isAuth = false;
	@observable username = '';
	@observable token = '';

	@action
	init() {
		this.username = '';
		this.token = '';
		this.isAuth = false;
	}

	@action
	async loginAsync(username: string, password: string) {
		const response = await apiService.loginAsync(username, password);
		if (response.length > 0) {
			runInAction('Login', () => {
				this.username = username;
				this.token = response;
				this.isAuth = true;
			});
		} else {
			throw new Error('用户不存在或用户登录密码错误.');
		}
	}

	@action
	async logoutAsync() {
		this.init();
	}
}
