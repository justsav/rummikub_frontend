// This functions returns array with sub-arrays of all the combinations in the Game board.
export function getAllCombinations(board) {
  const rows = []
  for (let i = 0; i < board.length; i += 16) {
    rows.push(board.slice(i, i + 16))
  }
  const allCombinations = []
  let tempArray = []

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] !== null) {
        tempArray.push(rows[i][j])
      }
      if (rows[i][j] === null) {
        if (tempArray.length > 0) {
          allCombinations.push(tempArray)
          tempArray = []
        }
      }
    }
    if (tempArray.length > 0) {
      allCombinations.push(tempArray)
    }
  }
  return allCombinations
}

/////////////////////////////////////////////////////////////////////
// The main function to check if the move in the GameBoard is Legal
export function checkLegal(board) {
  const combinations = getAllCombinations(board)

  // Function returns true if combination are in valid Group
  function checkRuns(combinations) {
    let resultArray = []
    const allEqual = (arr) => arr.every(item => item === arr[0])
    const isConsecutive = (arr) =>{
      for(let i=0; i<arr.length - 1; i++){
        if(arr[i + 1]-arr[i] !== 1) {
          return false
        }
      }
      return true
    }
    for (let i = 0; i < combinations.length; i++) {
      let numArray = []
      let alphaArray = []
      for (let j = 0; j < combinations[i].length; j++) {
        if(combinations[i].length < 3) {
          resultArray.push(false)
          continue
        }
        let tile = combinations[i][j]
        if(numArray.length > 0 && tile === 'JK'){
          numArray.push((parseInt(numArray[numArray.length - 1]) + 1).toString())
        }
        else if(numArray.length === 0 && tile === 'JK'){
          if(combinations[i][j + 1] === "JK"){
          numArray.push((parseInt((combinations[i][j + 2]).replace(/[^0-9]/g, "")) - 2).toString())
          }
          else{numArray.push((parseInt((combinations[i][j + 1]).replace(/[^0-9]/g, "")) - 1).toString())}
        }
        else{
          let alpha = tile.replace(/[0-9]/g, "")
          let num = tile.replace(/[^0-9]/g, "")
          alphaArray.push(alpha)
          numArray.push(num)
        }
      }

      if(isConsecutive(numArray) && allEqual(alphaArray)){
        resultArray.push(true)
      }
      else{resultArray.push(false)}
    }
    return resultArray
  }
  
 const checkGroups = (combinations) => {
    let resultArray = []
    const allEqual = (arr) => arr.every(item => item === arr[0])
    for (let i = 0; i < combinations.length; i++) {
      if(combinations[i].length > 4 || combinations[i].length < 3) {
        resultArray.push(false)
        continue
      }
      let numArray = []
      let alphaArray = []
      for (let j = 0; j < combinations[i].length; j++) {
        let tile = combinations[i][j]
        if(tile === 'JK'){continue}
        else{
          let alpha = tile.replace(/[0-9]/g, "")
          let num = tile.replace(/[^0-9]/g, "")
          alphaArray.push(alpha)
          numArray.push(num)
        }
      }
      const isDistinct = Array.from(new Set(alphaArray)).length === alphaArray.length
      if (allEqual(numArray) && isDistinct){
        resultArray.push(true)
      }
      else{resultArray.push(false)}
        
    }
    return resultArray
  }

  let resultGroup = checkGroups(combinations)
  let resultRuns = checkRuns(combinations)
  for(let i = 0; i < resultRuns.length; i++){
    if(!resultGroup[i] && !resultRuns[i]){
      return false
    }
  }
  return true
}
