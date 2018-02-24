import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import { withStyles } from 'material-ui/styles'

class SearchFlightsForm extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="from" label="From location" component="input" />
          <Field name="to" label="To location" component="input" />
          <Field name="dateFrom" label="Date from" component={DatePicker} />
          <Field name="dateTo" label="Date to" component={DatePicker} />
          <div>
            <input type="submit" value="Search Flights" />
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'searchFlights'
})(SearchFlightsForm)
