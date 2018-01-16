import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
/*引入受保护路由*/
import AuthRouter from './authRouter';
/*Redux异步Action测试*/
import reduxThunkAction from '../component/asyncExp/reduxThunkAction';
import reduxPromiseAction1 from '../component/asyncExp/reduxPromiseAction1';
import reduxPromiseAction2 from '../component/asyncExp/reduxPromiseAction2';
import Basic from '../component/basic/index';
/*前端页面组件*/
import Layout from '../component/layout/index';
import NotFound from '../containers/404/404';
import Home from '../containers/home/home';
import Login from '../containers/login/login';
import User from '../containers/user/index';
import Catetory from '../containers/catetory/index';
import Movie from '../containers/movie/index';
import Comment from '../containers/comment/index';

const RouterConfig = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" render={() => (<Redirect to="/login" />)} />
			<AuthRouter path="/login" component={Login} />
			<Layout>
				<Switch>
					<AuthRouter path="/home" component={Home} />
					<AuthRouter path="/basic" component={Basic} />
					<AuthRouter path="/reduxThunkAction" component={reduxThunkAction} />
					<AuthRouter path="/reduxPromiseAction1" component={reduxPromiseAction1} />
					<AuthRouter path="/reduxPromiseAction2" component={reduxPromiseAction2} />
					<AuthRouter path="/user" component={User} />
					<AuthRouter path="/catetory" component={Catetory} />
					<AuthRouter path="/movie" component={Movie} />
					<AuthRouter path="/:movieid/comment" component={Comment} />
					<AuthRouter path="*" component={NotFound} />
				</Switch>
			</Layout>
		</Switch>
	</HashRouter>
);
export default RouterConfig;
