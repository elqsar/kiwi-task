import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const tools = process.env.NODE_ENV === 'production' ? [] : [logger]

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, routerMiddleware(history), ...tools)
)

sagaMiddleware.run(saga)

export default store
