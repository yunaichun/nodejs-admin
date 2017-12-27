import axios from 'axios';

const qs = require('querystring');

export const baseDomain = 'http://localhost:3000';

/**
 * 用户管理模块
 */
//登陆
export const signin = (params) => (
	//可以携带cookie
	axios.create({ withCredentials: true }).get(`${baseDomain}/signin?${qs.stringify(params)}`).then(res => res.data)
);
//登陆
export const signup = (params) => (
	axios.get(`${baseDomain}/signup?${qs.stringify(params)}`).then(res => res.data)
);
//查询所有用户
export const selectUsers = () => (
	axios.create({ withCredentials: true }).get(`${baseDomain}/selectUsers`).then(res => res.data)
);
