import { selecDatas, deleteData, deleteDatas, updateData, addData } from '../../../api/index';
/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selecMockAll = () => {
	const request = selecDatas();
	return {
		type: 'selectDatas',
		payload: request
	};
};
// 删除单个
const deleteMockOne = (id) => {
	const request = deleteData({ id });
	return {
		type: 'deleteData',
		payload: request
	};
};
// 删除全部
const deleteMockAll = (params) => {
	const request = deleteDatas({ params });
	return {
		type: 'deleteDatas',
		payload: request
	};
};
// 修改单个
const editMockOne = (params) => {
	const request = updateData(params);
	return {
		type: 'updateData',
		payload: request
	};
};
// 新增单个
const addMockOne = (params) => {
	const request = addData(params);
	return {
		type: 'addData',
		payload: request
	};
};
export { selecMockAll, deleteMockOne, deleteMockAll, editMockOne, addMockOne };
