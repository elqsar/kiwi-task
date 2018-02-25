import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { DatePicker, TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'

import SuggestionArea from './SuggestionArea'

class SearchFlightsForm extends Component {
  static propTypes = {}

  changeValues = (event, newValue) => {
    if (newValue.length >= 3) {
      this.props.suggestion({ term: newValue, field: event.target.name })
    } else {
      this.props.resetSuggestions()
    }
  }

  onSelectSuggestion = (value, field) => {
    this.props.change(field, value)
    this.props.resetSuggestions()
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field
              name="from"
              component={TextField}
              hintText="From"
              autoComplete="off"
              onChange={this.changeValues}
            />
            <SuggestionArea
              suggestions={this.props.suggestions}
              onSelectSuggestion={this.onSelectSuggestion}
              forField="from"
            />
          </div>
          <div>
            <Field
              name="to"
              component={TextField}
              hintText="To"
              autoComplete="off"
              onChange={this.changeValues}
            />
            <SuggestionArea
              suggestions={this.props.suggestions}
              onSelectSuggestion={this.onSelectSuggestion}
              forField="to"
            />
          </div>
          <Field
            name="dateFrom"
            component={DatePicker}
            format={null}
            hintText="Date"
          />
          <div>
            <FlatButton
              disabled={pristine || submitting}
              type="submit"
              label="Search Flights"
              primary
            />
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'searchFlights'
})(SearchFlightsForm)
