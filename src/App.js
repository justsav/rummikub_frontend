import React, {useState} from 'react'
import RummikubClient from './RummikubClient'

const App = () => {
  const [player0, setPlayer0] = useState(false)
  const [player1, setPlayer1] = useState(false)

  return (
    <div>
      <button onClick={() => setPlayer0(true)}>Connect 0</button>
      <button onClick={() => setPlayer1(true)}>Connect 1</button>
      {player0 && <RummikubClient playerID="0" gameID="defaultGame"/>}
      {player1 && <RummikubClient playerID="1" gameID="defaultGame"/>}
    </div>
  )
}

export default App