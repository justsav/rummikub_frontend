import React, {useEffect, useState} from 'react'
import {Container} from "react-bootstrap"
import MyGame from './MyGame'
import FormName from './FormName'
import FormCreate from './FormCreate'
import GameList from './GameList'

export default function Lobby({
                                  playerName,
                                  setPlayerName,
                                  gameID,
                                  setGameID,
                                  playerID,
                                  setPlayerID,
                                  credentials,
                                  setCredentials,
                              }) {
    const [games, setGames] = useState([])
    const [numPlayers, setNumPlayers] = useState('2')


    const loadGames = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub`)
            .then(res => res.json())
            .then(data => setGames(data.rooms))
    }

    const createGame = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numPlayers: numPlayers
            })
        })
            .then(res => {
                console.log(res.status)
                loadGames()
            })
    }

    const joinGame = (gameId, playerId) => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/${gameId}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerId,
                playerName: playerName
            })
        })
            .then(res => res.json())
            .then(data => {
                setGameID(gameId)
                setPlayerID(playerId)
                setCredentials(data.playerCredentials)
                loadGames()
            })
            .catch(err => console.error(err))
    }

    const leaveGame = () => {
        fetch(`${process.env.REACT_APP_GAME_SERVER}games/rummikub/${gameID}/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerID,
                credentials: credentials
            })
        })
            .then(res => res.json())
            .then(data => {
                setGameID('')
                setPlayerID('')
                setCredentials('')
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadGames()

        const interval = setInterval(() => {
            loadGames()
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Container>
            <FormName {...{playerName, setPlayerName}}/>
            <FormCreate {...{createGame, setNumPlayers}}/>
            <GameList {...{games, playerID, gameID, joinGame, leaveGame}}/>
            <MyGame {...{playerName, gameID, playerID, credentials}}/>
        </Container>
    )
}

