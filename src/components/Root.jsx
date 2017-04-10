import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk, routerMiddleware(history), logger)
  ))

import About from './About'
import NotFound from './NotFound'

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Link to='/' className='hello-link'><h1>Vending Machine</h1></Link>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default Root
