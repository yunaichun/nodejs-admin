import React from 'react';
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';

import reduxThunkAction from '../containers/reduxThunkAction';
import reduxPromiseAction from '../containers/reduxPromiseAction';

const RouterConfig = () => (
  <HashRouter>
    <div>
		<Route exact path="/" component={reduxThunkAction} />
		<Route path="/test" component={reduxPromiseAction} />
    </div>
  </HashRouter>
);
export default RouterConfig;
