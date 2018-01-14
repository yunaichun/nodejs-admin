import { selectUsers, insertUser, deleteUser, deleteUsers, updateUser, importUsers, exportUsers } from '../../../api/index';

/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selectUs = () => {
	const request = selectUsers();
	return {
		type: 'selectUs',
		payload: request
	};
};
// 新增
const insertU = ({ name, password }) => {
	const request = insertUser({ name, password });
	return {
		type: 'insertU',
		payload: request
	};
};
// 删除
const deleteU = (id) => {
	const request = deleteUser(id).then((data) => { 
		data.id = id; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteU',
		payload: request
	};
};
// 批量删除
const deleteUs = (ids) => {
	const request = deleteUsers(ids).then((data) => { 
		data.ids = ids; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteUs',
		payload: request
	};
};
// 修改
const updateU = (params) => {
	const request = updateUser(params);
	return {
		type: 'updateU',
		payload: request
	};
};
// 导入
const importUs = (params) => {
	const request = importUsers(params);
	return {
		type: 'importUs',
		payload: request
	};
};
// 导出
const exportUs = () => {
	const request = exportUsers();
	return {
		type: 'exportUs',
		payload: request
	};
};
export { selectUs, insertU, deleteU, deleteUs, updateU, importUs, exportUs };

