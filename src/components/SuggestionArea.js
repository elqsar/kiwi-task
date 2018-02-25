import React, { Component } from 'react'

export default class Area extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
  }

  render() {
    const { suggestions, onSelectSuggestion, forField } = this.props
    if (suggestions[forField] && suggestions[forField].length > 0) {
      const data = suggestions[forField].map(it => {
        return (
          <li onClick={() => onSelectSuggestion(it.code, forField)} key={it.id}>
            {it.code} - {it.name}
          </li>
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
