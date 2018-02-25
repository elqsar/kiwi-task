import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  loadingSelector,
  search,
  flightSelector,
  suggestionsSelector,
  suggestion,
  loadMore,
  totalPagesSelector,
  nextOffsetSelector
} from '../ducks/flights'

import SearchFlightsForm from '../components/SearchForm'
import FlightsList from '../components/FlightsList'

class SearchFlights extends Component {
  static propTypes = {}

  componentDidMount() {}

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
        <FlightsList
          flights={this.props.flights}
          loadMore={this.props.loadMore}
          totalPages={this.props.totalPages}
          nextOffset={this.props.nextOffset}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    flights: flightSelector(state),
    suggestions: suggestionsSelector(state),
    totalPages: totalPagesSelector(state),
    nextOffset: nextOffsetSelector(state)
  }),
  { search, suggestion, loadMore }
)(SearchFlights)
