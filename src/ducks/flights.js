import {
  all,
  takeEvery,
  put,
  call,
  select,
  takeLatest
} from 'redux-saga/effects'
import { createSelector } from 'reselect'

import API from '../api/kiwi-http-client'

export const moduleName = 'flights'

//<editor-fold desc="Constants">
export const FETCH_FLIGHTS = `${moduleName}/FETCH_FLIGHTS`
export const FETCH_FLIGHTS_START = `${moduleName}/FETCH_FLIGHTS_START`
export const FETCH_FLIGHTS_READY = `${moduleName}/FETCH_FLIGHTS_READY`
export const FETCH_FLIGHTS_LAZY = `${moduleName}/FETCH_FLIGHTS_LAZY`
export const FETCH_FLIGHTS_START_LAZY = `${moduleName}/FETCH_FLIGHTS_START_LAZY`
export const FETCH_FLIGHTS_READY_LAZY = `${moduleName}/FETCH_FLIGHTS_READY_LAZY`
export const RESET_SUGGESTIONS = `${moduleName}/RESET_SUGGESTIONS`
export const ERROR = `${moduleName}/ERROR`

export const GET_SUGGESTIONS = `${moduleName}/GET_SUGGESTIONS`
export const GET_SUGGESTIONS_READY = `${moduleName}/GET_SUGGESTIONS_READY`
//</editor-fold>

const initialState = {
  loading: false,
  flights: [],
  suggestions: {},
  totalPages: 0,
  lastSearch: {},
  errors: []
}

//<editor-fold desc="Selectors">
export const stateSelector = state => state[moduleName]
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)
export const flightSelector = createSelector(
  stateSelector,
  state => state.flights
)
export const suggestionsSelector = createSelector(
  stateSelector,
  state => state.suggestions
)
export const totalPagesSelector = createSelector(
  stateSelector,
  state => state.totalPages
)
export const nextOffsetSelector = createSelector(
  stateSelector,
  state => state.lastSearch.offset
)
//</editor-fold

//<editor-fold desc="Reducers">
const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_FLIGHTS:
      return {
        ...state,
        loading: true
      }
    case FETCH_FLIGHTS_READY:
      return {
        ...state,
        loading: false,
        flights: payload.flights,
        totalPages: payload.totalPages,
        lastSearch: { ...payload.lastSearch },
        errors: []
      }
    case FETCH_FLIGHTS_START_LAZY:
      return {
        ...state,
        loading: false
      }
    case FETCH_FLIGHTS_READY_LAZY:
      return {
        ...state,
        loading: false,
        flights: [...state.flights, ...payload.flights],
        totalPages: payload.totalPages,
        lastSearch: { ...payload.lastSearch },
        errors: []
      }
    case GET_SUGGESTIONS_READY:
      return {
        ...state,
        suggestions: {
          [payload.field]: payload.locations
        }
      }
    case ERROR:
      return {
        ...state,
        loading: false,
        errors: [payload]
      }
    case RESET_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      }
    default:
      return state
  }
}
//</editor-fold>

//<editor-fold desc="Actions">
export function search(searchData) {
  return {
    type: FETCH_FLIGHTS,
    payload: searchData
  }
}

export function suggestion(term) {
  return {
    type: GET_SUGGESTIONS,
    payload: term
  }
}

export function resetSuggestions() {
  return {
    type: RESET_SUGGESTIONS
  }
}

export function loadMore() {
  return {
    type: FETCH_FLIGHTS_LAZY
  }
}
//</editor-fold>

//<editor-fold desc="Sagas">
export function* fetchFlightsSaga(action) {
  const { from, to, dateFrom, offset = 0 } = action.payload

  yield put({
    type: FETCH_FLIGHTS_START
  })

  try {
    const response = yield call(API.allFlights, {
      from,
      to,
      dateFrom,
      offset
    })

    const data = {
      flights: response.data,
      totalPages: response._results,
      lastSearch: {
        from,
        to,
        dateFrom,
        offset
      }
    }

    yield put({
      type: FETCH_FLIGHTS_READY,
      payload: data
    })
  } catch (error) {
    yield put({
      type: ERROR,
      payload: error.message
    })
  }
}

export function* fetchFlightsLazySaga() {
  const state = yield select(stateSelector)
  const { from, to, dateFrom, offset } = state.lastSearch

  yield put({
    type: FETCH_FLIGHTS_START_LAZY
  })

  const nextOffset = offset + 5

  try {
    const response = yield call(API.allFlights, {
      from,
      to,
      dateFrom,
      offset: nextOffset
    })

    const data = {
      flights: response.data,
      totalPages: response._results,
      lastSearch: {
        from,
        to,
        dateFrom,
        offset: nextOffset
      }
    }

    yield put({
      type: FETCH_FLIGHTS_READY_LAZY,
      payload: data
    })
  } catch (error) {
    yield put({
      type: ERROR,
      payload: error.message
    })
  }
}

export function* suggestLocationSaga(action) {
  const { term, field } = action.payload

  const response = yield call(API.suggestLocation, { term })
  yield put({
    type: GET_SUGGESTIONS_READY,
    payload: { locations: response.locations, field }
  })
}

export function* saga() {
  yield all([
    takeEvery(FETCH_FLIGHTS, fetchFlightsSaga),
    takeLatest(GET_SUGGESTIONS, suggestLocationSaga),
    takeLatest(FETCH_FLIGHTS_LAZY, fetchFlightsLazySaga)
  ])
}
//</editor-fold>

export default reducer
