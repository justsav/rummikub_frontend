import React from 'react'

const MainBoard = ({G, onClick}) => {
  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }

  let tbody = []
  for (let i = 0; i < 10; i++) {
    let cells = []
    for (let j = 0; j < 16; j++) {
      const id = 16 * i + j
      cells.push(
        <td style={cellStyle} key={id} onClick={() => onClick(id)}>
          {G.cells[id]}
        </td>
      )
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <table id="board">
      <tbody>{tbody}</tbody>
    </table>
  )
}

export default MainBoard