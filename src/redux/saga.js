import { all } from 'redux-saga/effects'
import { saga as flightsSaga } from '../ducks/flights'

export default function* rootSaga() {
  yield all([flightsSaga()])
}
