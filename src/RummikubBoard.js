import React from 'react'

const RummikubBoard = ({G, ctx, moves, events}) => {
  
  const isActive = (id) => {
    if (!isActive) return false;
    if (G.cells[id] !== null) return false;
    return true;
  }

  const onClick = (id) => {
    if (isActive(id)) {
      moves.ClickCell(id);
      events.endTurn();
    }
  }

  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < 12; i++) {
    let cells = [];
    for (let j = 0; j < 15; j++) {
      const id = 15 * i + j;
      cells.push(
        <td style={cellStyle} key={id} onClick={() => onClick(id)}>
          {G.cells[id]}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
    </div>
  )
}

export default RummikubBoard;