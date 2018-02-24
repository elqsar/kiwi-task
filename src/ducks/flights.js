import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import API from '../api/kiwi-http-client'

export const moduleName = 'flights'
export const FETCH_FLIGHTS = `${moduleName}/FETCH_FLIGHTS`
export const FETCH_FLIGHTS_START = `${moduleName}/FETCH_FLIGHTS_START`
export const FETCH_FLIGHTS_READY = `${moduleName}/FETCH_FLIGHTS_READY`

const initialState = {
  loading: false,
  flights: []
}

export const stateSelector = state => state[moduleName]
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

const reducer = (state = { ...initialState }, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_FLIGHTS:
      return {
        ...state,
        loading: true
      }
    case FETCH_FLIGHTS_READY:
      console.log('READY', payload)
      return {
        ...state,
        loading: false,
        flights: payload
      }
    default:
      return state
  }
}

export function search(searchData) {
  return {
    type: FETCH_FLIGHTS,
    payload: {
      ...searchData
    }
  }
}

export function fetchAllFlights() {
  return {
    type: FETCH_FLIGHTS
  }
}

export function* fetchFlightsSaga(action) {
  const { from, to } = action.payload

  yield put({
    type: FETCH_FLIGHTS_START
  })

  const response = yield call(API.allFlights, { from, to })

  yield put({
    type: FETCH_FLIGHTS_READY,
    payload: response.data
  })
}

export function* saga() {
  yield all([takeEvery(FETCH_FLIGHTS, fetchFlightsSaga)])
}

export default reducer
