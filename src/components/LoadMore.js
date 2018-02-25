import React from 'react'

import FlatButton from 'material-ui/FlatButton'

const LoadMore = ({ flights, loadMore, totalPages, nextOffset }) => {
  const render = () => {
    if (flights.length && (totalPages > nextOffset)) {
      return (
        <div>
          <FlatButton label="Load More" primary onClick={loadMore} />
        </div>
      )
    }
    return null
  }
  return (
    <div>
      { render() }
    </div>
  )
}

LoadMore.propTypes = {}

export default LoadMore
