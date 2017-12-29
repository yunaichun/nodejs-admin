import React from 'react';
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';
/*Redux异步Action测试*/
import reduxThunkAction from '../containers/examples/reduxThunkAction';
import reduxPromiseAction1 from '../containers/examples/reduxPromiseAction1';
import reduxPromiseAction2 from '../containers/examples/reduxPromiseAction2';
/*前端页面组件*/
import Login from '../containers/login/login';
import LayOut from '../containers/layout/layout';

const RouterConfig = () => (
  <HashRouter>
    <div>
		<Route exact path="/" component={Login} />
		<Route path="/home" component={LayOut} />
		<Route path="/reduxThunkAction" component={reduxThunkAction} />
		<Route path="/reduxPromiseAction1" component={reduxPromiseAction1} />
		<Route path="/reduxPromiseAction2" component={reduxPromiseAction2} />
    </div>
  </HashRouter>
);
export default RouterConfig;
