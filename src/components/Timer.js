import React, {useState, useEffect} from "react";


export default function Timer({playerID, PullTile, isCurrentPlayer}) {
  const [counter, setCounter] = useState(120)
   
  useEffect(() => {
    if(isCurrentPlayer) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
      counter === 0 && PullTile(playerID)
    }
  }, [counter, playerID, PullTile, isCurrentPlayer])

  return (
    <div>
      <p>Time Remaining: {counter}</p>
    </div>
  )
}