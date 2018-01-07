import axios from 'axios';
import qs from 'querystring';
import { globalVars } from '../util/config';
import Mock from '../mock/mock';

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
