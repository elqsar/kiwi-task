import React, { Component } from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Provider } from 'react-redux'

import store from './redux'
import history from './history'
import SearchFlights from './pages/SearchFlights'

class App extends Component {
  static propTypes = {}

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <SearchFlights />
        </Router>
      </Provider>
    )
  }
}

export default App
