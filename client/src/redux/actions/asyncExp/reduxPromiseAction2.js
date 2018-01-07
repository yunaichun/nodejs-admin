import { signin } from '../../../api/api';

// 异步action：返回Promise
const reduxPromiseAction2 = () => {
	const request = signin({ name: 'test', password: 'test' });
	return {
		type: 'reduxPromiseAction2',
		payload: request
	};
};
export { reduxPromiseAction2 };
