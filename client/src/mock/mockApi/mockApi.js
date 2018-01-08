import axios from 'axios';
import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Datas } from '../data/data';

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
						window.document.cookie = `name=${user.username}`;
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
					window.document.cookie = 'name=';
					resolve([200, { status: '200', msg: '退出成功' }]);
				}, 1000);
			});
		});


		//查询全部
		mock.onGet('/selecDatas').reply(config => {
			console.log(config);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, { status: '200', msg: '查询成功', data: Datas }]);
				}, 1000);
			});
		});
		//删除单个
		mock.onGet('/deleteData').reply(config => {
			const id = config.id;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					Datas.data = Datas.data.filter(u => {
						return u.id !== id;
					});
					resolve([200, { status: '200', msg: '删除成功', data: Datas }]);
				}, 1000);
			});
		});
		//删除全部
		mock.onGet('/deleteDatas').reply(config => {
			const params = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					Datas.data = Datas.data.filter(item => {
						return !params.some((param) => {
							return param.id === item.id;
						});
					});
					resolve([200, { status: '200', msg: '全部删除成功', data: Datas }]);
				}, 1000);
			});
		});
		//修改单个
		mock.onPost('/updateData').reply(config => {
			const editItem = JSON.parse(config.data);
			console.log(editItem);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					Datas.data = Datas.data.map(u => {
						if (u.id === editItem.id) {
							u = Object.assign({}, u, editItem);
						}
						return u;
					});
					resolve([200, { status: '200', msg: '修改成功', data: Datas }]);
				}, 1000);
			});
		});
		//新增单个
		mock.onPost('/addData').reply(config => {
			const addItem = JSON.parse(config.data);
			console.log(addItem);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					addItem.createTime = Mock.mock('@now');
					addItem.avatar = addItem.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', addItem.nickName.substr(0, 1));
					addItem.id = Mock.mock('@id');

					Datas.data.unshift(addItem);
					resolve([200, { status: '200', msg: '添加成功', data: Datas }]);
				}, 1000);
			});
		});
	}
};

export default mockApi;
