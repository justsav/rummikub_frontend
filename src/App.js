import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import RummikubClient from './RummikubClient'
import Lobby from './components/Lobby'

const App = () => {
    const [playerName, setPlayerName] = useState('Visitor')
    const [gameID, setGameID] = useState('')
    const [playerID, setPlayerID] = useState('')
    const [credentials, setCredentials] = useState('')

    return (
        <Router>
            <Switch>
                <Route path="/lobby">
                    <Lobby {...{
                        playerName,
                        setPlayerName,
                        gameID,
                        setGameID,
                        playerID,
                        setPlayerID,
                        credentials,
                        setCredentials,
                    }}/>
                </Route>
                <Route path="/game">
                    <RummikubClient {...{playerID, gameID, credentials}}/>
                </Route>
                <Route exact path="/">
                    <h1>Welcome to Rummikub</h1>
                    <Link to="/lobby">Enter lobby</Link>
                </Route>
            </Switch>

        </Router>
    )
}

export default App