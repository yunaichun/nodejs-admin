/**
 * 第一个参数是初始state值【state不能为undefined，所以默认为null】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default (state = null, action) => {
	switch (action.type) {
		case 'login':
			return action.payload;
		case 'signout':
			return action.payload;
		default: 
			return state;
	}
};
