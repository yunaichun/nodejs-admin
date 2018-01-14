import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, path: Path }) => {
	if (Path === '/login') {
		sessionStorage.removeItem('user');
	}
	const user = sessionStorage.getItem('user');
	let authLogin = false;
	if (!user && Path !== '/login') {
		authLogin = false; //从login页面到非login页面直接进，全部到login页面
	} else {
		authLogin = true;
	}
	return (
		<Route 
			path={Path} 
			render={props => (
				authLogin
				? 
				(<Component {...props} />) 
				: 
				(
					<Redirect 
						to={{
							pathname: '/login',
							state: { from: props.location }
						}} 
					/>
				)
			)} 
		/>
	);
};

export default AuthRoute;
