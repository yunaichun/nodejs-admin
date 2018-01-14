/**
 * 第一个参数是初始state值【state不能为undefined，所以默认为null】
 * 第二个参数是dispatch传入的参数
 * 所以dispatch相当于执行reducer函数
 */
export default (state = null, action) => {
	switch (action.type) {
		case 'selectUs':
			return action.payload;
		case 'insertU':
			{
				const newData = [action.payload.data, ...state.data];
				const newState = Object.assign({}, state, { data: newData });
				return newState;
			}
		case 'deleteU':
			{
				const newData = state.data.filter(item => item._id !== action.payload.id);
				const newState = Object.assign({}, state, { data: newData });
				return newState;
			}
		case 'deleteUs':
			{
				let newData = state.data;
				for (let i = 0; i < action.payload.ids.length; i++) {
					newData = newData.filter(item => {
						return item._id !== action.payload.ids[i];
					});
				}
				const newState = Object.assign({}, state, { data: newData });
				return newState;
			}
		case 'updateU':
			{
				const currentItem = state.data.filter(item => item._id === action.payload.data._id);
				const index = state.data.indexOf(currentItem[0]);
				const newData = [
					...state.data.slice(0, index),
					Object.assign({}, state.data[index], action.payload.data),
					...state.data.slice(index + 1)
				];
				const newState = Object.assign({}, state, { data: newData });
				return newState;
			}
		case 'importUs':
			{
				const newData = action.payload.data.data.concat(state.data);
				const newState = Object.assign({}, state, { data: newData });
				return newState;
			}
		case 'exportUs':
			{
				console.log('caonimabide:', state, action);
				return state;
			}
		default: 
			return state;
	}
};
