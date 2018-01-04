import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
/*Redux异步Action测试*/
import reduxThunkAction from '../component/asyncAction/reduxThunkAction';
import reduxPromiseAction1 from '../component/asyncAction/reduxPromiseAction1';
import reduxPromiseAction2 from '../component/asyncAction/reduxPromiseAction2';
import Basic from '../component/basic/index';
/*前端页面组件*/
import Layout from '../component/layout/index';
import Home from '../containers/home/home';
import NotFound from '../containers/404/404';
import Login from '../containers/login/login';


const RouterConfig = () => (
	<HashRouter>
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/404" component={NotFound} />
			<Layout>
				<Switch>
					<Route exact path="/home" component={Home} />
					<Route exact path="/basic" component={Basic} />
					<Route exact path="/reduxThunkAction" component={reduxThunkAction} />
					<Route exact path="/reduxPromiseAction1" component={reduxPromiseAction1} />
					<Route exact path="/reduxPromiseAction2" component={reduxPromiseAction2} />
					<Redirect from='*' to='/404' />
				</Switch>
			</Layout>
			<Redirect from='*' to='/404' />
		</Switch>
	</HashRouter>
);
export default RouterConfig;
