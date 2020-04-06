import React from 'react'
import { ItemTypes } from '../constants'
import { useDrag } from 'react-dnd'

export default function Tile({tile, x, y}) {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.TILE, x, y },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  })

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      {tile}
    </div>
  )

}