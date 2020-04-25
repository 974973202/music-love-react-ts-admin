class ApiService {
	async loginAsync(username: string, password: string): Promise<string> {
		if (username === 'admin' && password === '123456') {
			await this.delay(500);
			return username + password;
		}

		return '';
	}

	delay(timeout: number): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, timeout);
		});
	}
}

export default new ApiService();
