import { selectCatetories, insertCatetory, deleteCatetory, deleteCatetories, updateCatetory } from '../../../api/index';

/**
 * [userAction 调用reducer]
 * 它们的作用是封装动作对象的内部结构，以便其余的代码库不需要关心它。
 * 操作创建者还可以方便地记录在给定应用程序中可以调度的所有操作。
 */
// 查询全部
const selectCats = () => {
	const request = selectCatetories();
	return {
		type: 'selectCats',
		payload: request
	};
};
// 新增
const insertCat = ({ name }) => {
	const request = insertCatetory({ name });
	return {
		type: 'insertCat',
		payload: request
	};
};
// 删除
const deleteCat = (id) => {
	const request = deleteCatetory(id).then((data) => { 
		data.id = id; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteCat',
		payload: request
	};
};
// 批量删除
const deleteCats = (ids) => {
	const request = deleteCatetories(ids).then((data) => { 
		data.ids = ids; //将id回传给reducer
		return data;
	});
	return {
		type: 'deleteCats',
		payload: request
	};
};
// 修改
const updateCat = (params) => {
	const request = updateCatetory(params);
	return {
		type: 'updateCat',
		payload: request
	};
};

export { selectCats, insertCat, deleteCat, updateCat, deleteCats };

