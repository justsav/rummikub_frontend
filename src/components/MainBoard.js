import React from 'react'
import Square from './Square'
import Tile from './Tile'

const MainBoard = ({G, moveToBoard}) => {
  const cellStyle = {
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  const renderTile = (x, y) => {
    const tile = G.cells[y * 16 + x]
    return tile ? <Tile {...{tile, x, y}}/> : null
  }

  let tbody = []
  for (let y = 0; y < 10; y++) {
    let cells = []
    for (let x = 0; x < 16; x++) {
      const id = 16 * y + x
      cells.push(
        <td style={cellStyle} key={id}>
          <Square {...{x, y, moveToBoard}}>
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