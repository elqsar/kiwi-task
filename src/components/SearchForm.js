import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'

class SearchFlightsForm extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="from" component={TextField} hintText="From" />
          </div>
          <div>
            <Field
              name="to"
              label="To location"
              component={TextField}
              hintText="To"
            />
          </div>
          <Field
            name="dateFrom"
            component={DatePicker}
            format={null}
            hintText="Date from"
          />
          <div>
            <input type="submit" value="Search Flights" />
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'searchFlights',
  fields: ['location']
})(SearchFlightsForm)
