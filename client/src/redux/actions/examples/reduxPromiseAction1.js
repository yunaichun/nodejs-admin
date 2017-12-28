import { signin } from '../../../api/api';

// 异步action：返回Promise
const reduxPromiseAction1 = (dispatch) => new Promise((resolve, reject) => {
	return signin({ name: 'test', password: 'test' })
			.then((data) => ({
				type: 'reduxPromiseAction',
				payload: data
			}));
});

export { reduxPromiseAction1 };
