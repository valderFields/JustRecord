import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {  combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { routeConfig } from './router';
import reducers from './reducers';
import createStore from './store/index';
const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore (
  reducers,
  applyMiddleware(middleware)
);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {routeConfig}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);