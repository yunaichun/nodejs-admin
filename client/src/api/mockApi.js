import axios from 'axios';
import { globalVars } from '../util/config';
import Mock from '../mock/mockApi/mockApi';

Mock.bootstrap();
const mockDomain = globalVars.mockDomain;

//登陆
export const signin = (params) => (
	axios.post(`${mockDomain}/signin`, params).then(res => res.data)
);
//退出
export const logout = () => (
	axios.get(`${mockDomain}/logout`).then(res => res.data)
);


//查询全部
export const selecDatas = () => (
	axios.get(`${mockDomain}/selecDatas`).then(res => res.data)
);
//删除单个
export const deleteData = (params) => (
	axios.get(`${mockDomain}/deleteData`, params).then(res => res.data)
);
//删除全部
export const deleteDatas = (params) => (
	axios.get(`${mockDomain}/deleteDatas`, params).then(res => res.data)
);
//修改单个
export const updateData = (params) => (
	axios.post(`${mockDomain}/updateData`, params).then(res => res.data)
);
//新增单个
export const addData = (params) => (
	axios.post(`${mockDomain}/addData`, params).then(res => res.data)
);
