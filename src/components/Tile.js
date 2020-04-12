import React from 'react'
import { ItemTypes } from '../constants'
import { useDrag } from 'react-dnd'
import face from '../static/face.svg'

export default function Tile({tile, x, y, location}) {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.TILE, x, y, location},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  })

  const labelColor = (tile) => {
    let cCode = tile.charAt(0);
    let tColor = ''
    if (cCode === 'B') {
      tColor = 'blue'
    } else if (cCode === 'K') {
      tColor = 'black'
    } else if (cCode === 'O') {
      tColor = 'orange'
    } else {
      tColor = 'red'
    }
    return tColor
  }

  return (
    <div
      id='tile-style'
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 30,
        textShadow: '1px 1px 1px gray',
        fontWeight: 'bold',
        cursor: 'move',
        backgroundColor: '#fcf3d9',
        borderRadius: '8px',
        color: labelColor(tile),
      }}
    >
      {tile.slice(1) !== 'K' ? tile.slice(1) : <img src={face} tag='joker face' width='32' alt="joker face tile" />}
    </div>
  )

}