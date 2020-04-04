import React from 'react'
import RummikubClient from './RummikubClient'

const App = () => {
  return (
    <div>
      <h1>Player one</h1>
      <RummikubClient playerID="0"/>
      <br/>
      <br/>
      <h1>Player two</h1>
      <RummikubClient playerID="1"/>
    </div>
  )
}

export default App