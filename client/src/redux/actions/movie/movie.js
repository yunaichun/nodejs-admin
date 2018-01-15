import { selectMovies, deleteMovie, insertMovie, updateMovie, deleteMovies } from '../../../api/index';

/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selectMovs = () => {
	const request = selectMovies();
	return {
		type: 'selectMovs',
		payload: request
	};
};
// 删除电影
const deleteMov = (id) => {
	const request = deleteMovie(id).then((data) => { 
		data.id = id; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteMov',
		payload: request
	};
};
// 新增
const insertMov = (params) => {
	const request = insertMovie(params);
	return {
		type: 'insertMov',
		payload: request
	};
};
// 修改
const updateMov = (params) => {
	const request = updateMovie(params);
	return {
		type: 'updateMov',
		payload: request
	};
};
// 批量删除
const deleteMovs = (ids) => {
	const request = deleteMovies(ids).then((data) => { 
		data.ids = ids; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteMovs',
		payload: request
	};
};
export { selectMovs, deleteMov, insertMov, updateMov, deleteMovs };
