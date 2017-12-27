import React from 'react';
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';

import Home from '../containers/home';

const RouterConfig = () => (
  <HashRouter>
    <div>
		<Route exact path="/" component={Home} />
    </div>
  </HashRouter>
);
export default RouterConfig;
