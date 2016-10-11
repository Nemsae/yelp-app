import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import BusinessPage from './components/BusinessPage';
// import EditPage from './components/EditPage';
import SearchPage from './components/SearchPage';
// import SearchStore from './stores/SearchStore';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={SearchPage} />
      <Route path='/:id' component={BusinessPage} />
      {/* <Route path='/testpage' component={TestPage} /> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
