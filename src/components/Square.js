import React from 'react'
import { ItemTypes } from '../constants'
import { useDrop } from 'react-dnd'

export default function Square({x, y, location, MoveTile, children}) {
  const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.TILE,
    drop: (item) => MoveTile({ 
      fromLocation: item.location, 
      fromX: item.x, 
      fromY: item.y, 
      toLocation: location, 
      toX:x, 
      toY: y 
    }),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  })

  const cellStyle = {
    position: 'relative',
    border: isOver ? '5px solid rgba(255, 255, 255, .5)' : '1px solid rgba(255, 255, 255, .1)',
    width: '100%',
    height: '52px',
    // backgroundColor: 'white',
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