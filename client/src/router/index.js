import React from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
/*Redux异步Action测试*/
import reduxThunkAction from '../containers/examples/reduxThunkAction';
import reduxPromiseAction1 from '../containers/examples/reduxPromiseAction1';
import reduxPromiseAction2 from '../containers/examples/reduxPromiseAction2';
/*前端页面组件*/
import Layout from '../component/layout/layout';
import Login from '../containers/login/login';
import Home from '../containers/home/home';

const RouterConfig = () => (
	<HashRouter>
		<Switch>
			<Route path="/login" component={Login} />
			<Layout>
				<Route exact path="/home" component={Home} />
				<Route path="/reduxThunkAction" component={reduxThunkAction} />
				<Route path="/reduxPromiseAction1" component={reduxPromiseAction1} />
				<Route path="/reduxPromiseAction2" component={reduxPromiseAction2} />
			</Layout>
		</Switch>
	</HashRouter>
);
export default RouterConfig;
