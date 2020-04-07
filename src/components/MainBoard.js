import React from 'react'
import Square from './Square'
import Tile from './Tile'
import {BOARD_WIDTH, BOARD_HEIGHT} from '../constants'

const MainBoard = ({G, MoveTile}) => {
  const cellStyle = {
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  const renderTile = (x, y) => {
    const tile = G.cells[y * BOARD_WIDTH + x]
    return tile ? <Tile {...{ tile, x, y, location: 'board' }}/> : null
  }

  let tbody = []
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    let cells = []
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const id = BOARD_WIDTH * y + x
      cells.push(
        <td style={cellStyle} key={id}>
          <Square {...{ x, y, location: 'board', MoveTile }}>
            {renderTile(x, y)}
          </Square>
        </td>
      )
    }
    tbody.push(<tr key={y}>{cells}</tr>);
  }

  

  return (
    <table id="board">
      <tbody>{tbody}</tbody>
    </table>
  )
}

export default MainBoard