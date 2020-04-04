import React from 'react'

const Rack = ({playerRack}) => {
  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  }


  return (
    <table id="rack">
      <tbody>
        <tr>
          {playerRack.map((tile, index) => 
            <td style={cellStyle} key={index}>
              {tile}
            </td>
          )}
        </tr>
      </tbody>
    </table>
  )
}

export default Rack