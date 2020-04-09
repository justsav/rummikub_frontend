import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import RummikubClient from './RummikubClient'
import Lobby from './components/Lobby'

const App = () => {
    const [playerName, setPlayerName] = useState('Visitor')
    const [gameID, setGameID] = useState('')
    const [playerID, setPlayerID] = useState('')
    const [credentials, setCredentials] = useState('')
    const [startGame, setStartGame] = useState(false)

    return (
        <div>
            {!startGame &&
                <Lobby {...{
                    playerName,
                    setPlayerName,
                    gameID,
                    setGameID,
                    playerID,
                    setPlayerID,
                    credentials,
                    setCredentials,
                    setStartGame
                }}/>
            }
            {startGame && <RummikubClient {...{playerID, gameID, credentials}}/>}
        </div>
    )
}

export default App