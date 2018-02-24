import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import flightsReducer, { moduleName as flightsModule } from '../ducks/flights'

export default combineReducers({
  router,
  form,
  [flightsModule]: flightsReducer,
})
