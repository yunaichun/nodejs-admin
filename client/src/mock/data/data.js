import Mock from 'mockjs';

const LoginUsers = [
	{
		id: 1,
		username: 'test',
		password: 'test',
		avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
		name: '张某某'
	}
];

const Users = Mock.mock({
	'data|80-100': [
		{
			id: '@id',
			name: '@name',
			nickName: '@last',
			phone: /^1[34578]\d{9}$/,
			'age|11-99': 1,
			address: '@county(true)',
			isMale: '@boolean',
			email: '@email',
			createTime: '@datetime',
			avatar() {
				return Mock.Random.image(
					'100x100',
					Mock.Random.color(),
					'#757575', 
					'png', 
					this.nickName.substr(0, 1)
				);
			},
		},
	],
});
export { LoginUsers, Users };
