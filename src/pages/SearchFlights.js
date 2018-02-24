import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchAllFlights, loadingSelector, search } from '../ducks/flights'
import SearchFlightsForm from '../components/SearchForm'

class SearchFlights extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    if (this.props.loading)
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    return (
      <div>
        <SearchFlightsForm onSubmit={this.props.search} />
        Search Flights
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state)
  }),
  { fetchAllFlights, search }
)(SearchFlights)
