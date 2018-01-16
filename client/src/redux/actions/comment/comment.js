import { selectComments, insertComment, deleteComment, deleteComments } from '../../../api/index';

/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selectComs = ({ movieId }) => {
	const request = selectComments({ movieId });
	return {
		type: 'selectComs',
		payload: request
	};
};
// 新增+修改【有回复才会修改】
const insertCom = (params) => {
	const request = insertComment(params);
	return {
		type: 'insertCom',
		payload: request
	};
};
// 删除
const deleteCom = (id) => {
	const request = deleteComment(id).then((data) => { 
		data.id = id; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteCom',
		payload: request
	};
};
// 批量删除
const deleteComs = (ids) => {
	const request = deleteComments(ids).then((data) => { 
		data.ids = ids; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteComs',
		payload: request
	};
};
export { selectComs, insertCom, deleteCom, deleteComs };

