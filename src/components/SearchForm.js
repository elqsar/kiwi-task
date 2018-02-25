import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'

class SearchFlightsForm extends Component {
  static propTypes = {}

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
            hintText="Date"
          />
          <div>
            <FlatButton type="submit" label="Search Flights" primary />
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'searchFlights'
})(SearchFlightsForm)
