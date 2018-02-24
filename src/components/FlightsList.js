import React from 'react'

import Flight from './Flight'
import EmptyList from './EmptyList'
import LoadMore from './LoadMore'

const FlightsList = ({ flights, loadMore, totalPages, nextOffset }) => {
  return (
    <div>
      {flights.length ? (
        flights.map(it => {
          return <Flight key={it.id} flight={it} />
        })
      ) : (
        <EmptyList message="No results" />
      )}
      <LoadMore
        flights={flights}
        loadMore={loadMore}
        totalPages={totalPages}
        nextOffset={nextOffset}
      />
    </div>
  )
}

FlightsList.propTypes = {}

export default FlightsList
