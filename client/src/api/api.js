import axios from 'axios';
import qs from 'querystring';
import { globalVars } from '../util/config';

const baseDomain = globalVars.baseDomain;
/*跨域请求得携带cookie*/
axios.defaults.withCredentials = true; 

// /**
//  * 登陆模块:用mockAPI登陆
//  */
// //登陆
// export const signin = (params) => (
// 	axios.get(`${baseDomain}/signin?${qs.stringify(params)}`).then(res => res.data)
// );
// //退出
// export const logout = () => (
// 	axios.get(`${baseDomain}/logout`).then(res => res.data)
// );


/**
 * 用户管理模块
 */
//查询用户
export const selectUsers = () => (
	axios.create({ withCredentials: true })
	.get(`${baseDomain}/selectUsers`).then(res => res.data)
);
//添加用户
export const insertUser = (params) => (
	axios.get(`${baseDomain}/insertUser?${qs.stringify(params)}`).then(res => res.data)
);
//删除用户
export const deleteUser = (id) => (
	axios.get(`${baseDomain}/deleteUser/${id}`).then(res => res.data)
);
//批量删除用户
export const deleteUsers = (ids) => {
	let data = '';
	for (let i = 0; i < ids.length; i++) {
		data = data + 'ids=' + ids[i] + '&';
	}
	return axios.post(`${baseDomain}/deleteUsers`, 
		data,
		{ 
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}
	);
};
//修改用户
export const updateUser = (params) => (
	axios.get(`${baseDomain}/updateUser?${qs.stringify(params)}`).then(res => res.data)
);
//导入用户
export const importUsers = (params) => (
	axios.post(`${baseDomain}/importUsers`, 
		params, 
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	)
);
//导出用户
export const exportUsers = () => (
	axios.get(`${baseDomain}/exportUsers`)
);


/**
 * 分类管理模块
 */
//查询分类
export const selectCatetories = () => (
	axios.get(`${baseDomain}/selectCatetories`).then(res => res.data)
);
//新增分类
export const insertCatetory = (params) => (
	axios.get(`${baseDomain}/insertCatetory?${qs.stringify(params)}`).then(res => res.data)
);
//删除分类
export const deleteCatetory = (id) => (
	axios.get(`${baseDomain}/deleteCatetory/${id}`).then(res => res.data)
);
//批量删除分类
export const deleteCatetories = (ids) => {
	let data = '';
	for (let i = 0; i < ids.length; i++) {
		data = data + 'ids=' + ids[i] + '&';
	}
	return axios.post(`${baseDomain}/deleteCatetories`, 
		data,
		{ 
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}
	);
};
//修改分类
export const updateCatetory = (params) => (
	axios.get(`${baseDomain}/updateCatetory?${qs.stringify(params)}`).then(res => res.data)
);


/**
 * 电影管理模块
 */
//查询电影
export const selectMovies = () => (
	axios.get(`${baseDomain}/selectMovies`).then(res => res.data)
);
//删除电影
export const deleteMovie = (id) => (
	axios.get(`${baseDomain}/deleteMovie/${id}`).then(res => res.data)
);
//新增电影
export const insertMovie = (params) => {
	let formData = new FormData();
	for(let key in params) {
		formData.append(key, params[key]);//Excel文件名
	}
	return axios.post(`${baseDomain}/insertMovie`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	).then(res => res.data);
};
//修改电影
export const updateMovie = (params) => {
	let formData = new FormData();
	for(let key in params) {
		formData.append(key, params[key]);//Excel文件名
	}
	return axios.post(`${baseDomain}/updateMovie`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	).then(res => res.data);
};
//批量删除电影
export const deleteMovies = (ids) => {
	let data = '';
	for (let i = 0; i < ids.length; i++) {
		data = data + 'ids=' + ids[i] + '&';
	}
	return axios.post(`${baseDomain}/deleteMovies`, 
		data,
		{ 
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}
	);
};

/**
 * 评论管理模块
 */
//查询评论
export const selectComments = (params) => (
	axios.get(`${baseDomain}/selectComments?${qs.stringify(params)}`).then(res => res.data)
);
//添加+修改评论
export const insertComment = (params) => {
	return axios.get(`${baseDomain}/insertComment?${qs.stringify(params)}`).then(res => res.data);
};
//删除评论
export const deleteComment = (id) => (
	axios.get(`${baseDomain}/deleteComment/${id}`).then(res => res.data)
);
//批量删除评论
export const deleteComments = (ids) => {
	let data = '';
	for (let i = 0; i < ids.length; i++) {
		data = data + 'ids=' + ids[i] + '&';
	}
	return axios.post(`${baseDomain}/deleteComments`, 
		data,
		{ 
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}
	);
};

