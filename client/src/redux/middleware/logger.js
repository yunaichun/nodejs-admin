export const logger = store => next => action => {
	//中间件可以获取store的方法：{getState: ƒ, dispatch: ƒ}
	console.log('prev action', store.getState());
	console.log('dispatching', action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
};
