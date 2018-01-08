import axios from 'axios';
import qs from 'querystring';
import { globalVars } from '../util/config';

const baseDomain = globalVars.baseDomain;
/*跨域请求得携带cookie*/
axios.defaults.withCredentials = true; 
/**
 * 用户管理模块
 */
// //登陆
// export const signin = (params) => (
// 	//可以携带cookie
// 	axios.create({ withCredentials: true })
// 	.get(`${baseDomain}/signin?${qs.stringify(params)}`).then(res => res.data)
// );
// //退出
// export const logout = () => (
// 	axios.get(`${baseDomain}/logout`).then(res => res.data)
// );
