import React from 'react'

const Rack = ({playerRack}) => {
  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  let tbody = []
  for (let i = 0; i < 4; i++) {
    let cells = []
    for (let j = 0; j < 8; j++) {
      const id = 8 * i + j
      cells.push(
        <td style={cellStyle} key={id} >
          {playerRack[id]}
        </td>
      )
    }
    tbody.push(<tr key={i}>{cells}</tr>);
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