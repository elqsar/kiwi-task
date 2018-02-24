import React from 'react'

const EmptyList = ({ message }) => {
  return (
    <div style={{ padding: '8px' }}>
      { message }
    </div>
  )
}

EmptyList.propTypes = {}

export default EmptyList
