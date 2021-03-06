import React, { Component } from 'react'

export default class Area extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    const { suggestions, onSelectSuggestion, forField } = this.props
    const suggestionsForField = suggestions[forField]
    if (suggestionsForField && suggestionsForField.length > 0) {
      const data = suggestionsForField.map(it => {
        return (
          <ul style={
            { listStyleType: 'none' }
          } key={it.id}>
            <li onClick={() => onSelectSuggestion(it.code, forField)}>
              {it.code} - {it.name}
            </li>
          </ul>
        )
      })
      return (
        <div>
          { data }
        </div>
      )
    }
    return null
  }
}
