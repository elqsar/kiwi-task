import { all } from 'redux-saga/effects'
// import {saga as eventsSaga} from '../ducks/events'

export default function* rootSaga() {
  yield all([
    // eventsSaga()
  ])
}
