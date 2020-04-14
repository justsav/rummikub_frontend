import React from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function MyGame({
  playerName,
  gameID,
  playerID,
  credentials,
  leaveGame,
  setGameID,
  setPlayerID,
  setCredentials
}) {
  const history = useHistory()

  const handleLeave = () => {
    localStorage.removeItem('gameID')
    localStorage.removeItem('playerID')
    localStorage.removeItem('credentials')
    setGameID('')
    setPlayerID('')
    setCredentials('')
    leaveGame()
  }

  return (
    <div>
      <h2 id='lobby-subtitle'>- CURRENT GAME -</h2>
      <ul>
        <li>Player Name: {playerName || "none"}</li>
        <li>Game ID: {gameID || "none"}</li>
        <li>Player ID: {playerID || "none"}</li>
        <li>Credentials: {credentials ? "Ready" : "Missing"}</li>
      </ul>
      <div id='current-game-buttons'>
        <Button
          id='open-game-btn'
          disabled={!gameID || !playerID || !credentials}
          variant={"primary"}
          onClick={() => history.push("/game")}
        >
          Play Now
        </Button>
        <Button
          id='leave-game-btn'
          variant="danger"
          onClick={handleLeave}
          disabled={!gameID || !playerID || !credentials}
        >
          Leave Game
        </Button>
      </div>
    </div>
  )
}

