import { signin } from '../../api/api';

// 异步action：返回函数
const reduxThunkAction = () => {
	return dispatch => {
		dispatch({
			type: 'GET_DATA', 
			oldState: null
		});
		//登陆成功将获取数据存入Redux Store
		//用return可以调用.then()
		return signin({ name: 'test', password: 'test' })
			.then((data) => {
				dispatch({ 
					type: 'reduxThunkAction', 
					successState: data 
				});
			})
			.catch(error => {
				dispatch({
                    type: 'GET_DATA_FAILED',
                    errorState: error
                });
			});
	};
};
// 异步action：返回Promise
// const reduxPromiseAction = () => {
// 	return dispatch => {
// 		return new Promise((resolve, reject) => {
// 			return signin({ name: 'test', password: 'test' })
// 					.then((data) => {
// 						dispatch({ type: 'reduxPromiseAction', data });
// 					});
// 		});
// 	};
// };
//action creator
const reduxPromiseAction = () => {
    return {
        type: 'reduxPromiseAction',
        successState: signin({ name: 'test', password: 'test' }).then((data) => { console.log(data); })
    };
};

export { reduxThunkAction, reduxPromiseAction };
