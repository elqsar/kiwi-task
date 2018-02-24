import React from 'react'
import moment from 'moment'

const Flight = ({ flight }) => {

  const toDate = date => moment(date)

  return (
    <div style={ { padding: 8, width: '100%' } }>
      <p>Date from: { flight.aTime } Date to: {flight.dTime}</p>
      <p>From: {flight.cityFrom} To: {flight.cityTo}</p>
      <p>Price: {flight.price} EUR</p>
    </div>
  )
}

Flight.propTypes = {}

export default Flight
