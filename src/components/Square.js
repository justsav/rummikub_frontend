import React from 'react'
import { ItemTypes } from '../constants'
import { useDrop } from 'react-dnd'

export default function Square({x, y, moveToBoard, children}) {
  const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.TILE,
		drop: (item) => moveToBoard(item.x, item.y, x, y),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  })

  const cellStyle = {
    position: 'relative',
    border: '1px solid black',
    width: '100%',
    height: '100%',
    // margin: '0 auto',
    backgroundColor: 'white',
    color: 'black'
  }

  return (
    <div
      ref={drop}
      style={cellStyle}
    >
      {children}
    </div>
  )

}