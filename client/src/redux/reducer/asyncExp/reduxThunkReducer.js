/**
 * 第一个参数是初始state值【state不能为undefined，所以默认为null】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default (state = null, action) => {
	switch (action.type) {
		case 'GET_DATA' : 
			return action.oldState;
		case 'reduxThunkAction':
			return action.successState;
		case 'GET_DATA_FAILED' : 
			return action.errorState;
		default: 
			return state;
	}
};
