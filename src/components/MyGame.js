import React from "react"
import { Button } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function MyGame({
  playerName,
  gameID,
  playerID,
  credentials,
  leaveGame,
}) {
  const history = useHistory()

  const handleLeave = () => {
    leaveGame()
  }

  return (
    <div>
      <h2>My Game:</h2>
      <ul>
        <li>Player Name: {playerName || "none"}</li>
        <li>Game ID: {gameID || "none"}</li>
        <li>Player ID: {playerID || "none"}</li>
        <li>Credentials: {credentials ? "Ready" : "Missing"}</li>
      </ul>
      <Button
        disabled={!gameID || !playerID || !credentials}
        variant={"primary"}
        onClick={() => history.push("/game")}
      >
        Start Game
      </Button>
      <Button
        variant="danger"
        onClick={handleLeave}
        disabled={!gameID || !playerID || !credentials}
      >
        Leave Game
      </Button>
    </div>
  )
}
