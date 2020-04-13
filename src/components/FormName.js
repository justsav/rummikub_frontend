import React from "react"
import { Form } from "react-bootstrap"
import '../lobby.css'

export default function FormName({ playerName, setPlayerName }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group controlId="playerId" id='form-name'>
        <Form.Label id='name-label'>First, tell us your name:</Form.Label>
          <Form.Control
            id='name-input'
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
      </Form.Group>
    </Form>
  )
}
