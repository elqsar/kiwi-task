import React from 'react'
import moment from 'moment'

const toDate = date => moment(date * 1000).format('DD.MM.YYYY')
const toTime = date => moment(date * 1000).format('LT')

const Flight = ({ flight }) => {
  return (
    <div style={ { padding: 8, width: '100%' } }>
      <p><strong>Date:</strong> { toDate(flight.dTime) }</p>
      <p><strong>Destination:</strong> {flight.cityFrom} - {flight.cityTo}</p>
      <p><strong>Time:</strong> { toTime(flight.dTime) } - { toTime(flight.aTime) }</p>
      <p><strong>Price:</strong> {flight.price} EUR</p>
    </div>
  )
}

Flight.propTypes = {}

export default Flight
