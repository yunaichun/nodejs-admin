import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/data';

const mockApi = {
	bootstrap() {
		const mock = new MockAdapter(axios);
		// mock success request
		mock.onGet('/success').reply(200, {
			msg: 'success'
		});
		// mock error request
		mock.onGet('/error').reply(500, {
			msg: 'failure'
		});


		//登录接口
		mock.onPost('/signin').reply(config => {
			console.log(config);
			const { name, password } = JSON.parse(config.data);
			return new Promise((resolve, reject) => {
				let user = null;
				setTimeout(() => {
					const hasUser = LoginUsers.some(u => {
						if (u.username === name && u.password === password) {
							user = JSON.parse(JSON.stringify(u));
							//用户密码不传入前端
							user.password = undefined;
							return true;
						}
					});
					//config.transformResponse.session.user = user;
					// LoginUsers存在用户名和密码匹配的项目
					if (hasUser) {
						window.document.cookie = 'name=' + user.username;
						resolve([200, { status: '200', msg: '登陆成功', user }]);
					} else {
						resolve([200, { status: '500', msg: '账号或密码错误' }]);
					}
				}, 1000);
			});
		});
		//退出
		mock.onGet('/logout').reply(config => {
			console.log(config);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					delete window.document.cookie.name;
					resolve([200, { status: '200', msg: '退出成功' }]);
				}, 1000);
			});
		});
	}
};

export default mockApi;
