import React from 'react'
import Square from './Square'
import Tile from './Tile'

const Rack = ({playerRack, MoveTile}) => {
  const cellStyle = {
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  const renderTile = (x, y) => {
    const tile = playerRack[y * 8 + x]
    return tile ? <Tile {...{ tile, x, y, location: 'rack' }}/> : null
  }

  let tbody = []
  for (let y = 0; y < 4; y++) {
    let cells = []
    for (let x = 0; x < 8; x++) {
      const id = 8 * y + x
      cells.push(
        <td style={cellStyle} key={id} >
          <Square {...{ x, y, location: 'rack', MoveTile }}>
            {renderTile(x, y)}
          </Square>
        </td>
      )
    }
    tbody.push(<tr key={y}>{cells}</tr>);
  }

  return (
    <table id="rack">
      <tbody>
        {tbody}
      </tbody>
    </table>
  )
}

export default Rack