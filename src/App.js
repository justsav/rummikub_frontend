import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import RummikubClient from './RummikubClient'
import Lobby from './components/Lobby'
import Home from './components/Home'

const App = () => {
    const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || 'Visitor')
    const [gameID, setGameID] = useState(localStorage.getItem('gameID') || '')
    const [playerID, setPlayerID] = useState(localStorage.getItem('playerID') || '')
    const [credentials, setCredentials] = useState(localStorage.getItem('credentials') || '')

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
                    <Home />
                </Route>
            </Switch>

        </Router>
    )
}

export default App