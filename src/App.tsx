import React from "react"
import './App.css'
import Die from "./Die" 
import Confetti from 'react-confetti' 

type ObDiess={
  isHeld: boolean
  randNum:number
  keyIdx: number
}
export default function App() {

  const [randState, SetrandState]= React.useState(allNewDice)  //randStat is Array of ObDiess
  const [tenz, setTenz]=React.useState(false)
  
  React.useEffect(()=>{
    const isAllHeld=randState.every(die=>die.isHeld)
    const value=randState[0].randNum
    const sameValue=randState.every(die=>die.randNum===value)

    if(isAllHeld && sameValue){
      setTenz(true)
    }
  },
    [randState]
  )
    function allNewDice(): ObDiess[] {
    let num =Math.floor(Math.random()*6)+1;
    const ArrObDies:ObDiess[]=[
      {isHeld:false,
        randNum:num,
        keyIdx: 0
      }] 
    for(let i=1; i<10 ;i++){
      num =Math.floor(Math.random()*6)+1; //rang [1,6]
      ArrObDies.push({
        isHeld:false,
        randNum:num,
        keyIdx: i
      })
    }
    return ArrObDies
  }

  const ArrObDiesCall =randState.map((di)=>
      <Die keyIdx={di.keyIdx} num={di.randNum} isHeld={di.isHeld} holdDice={()=>handleBtnDice(di.keyIdx)}/>
    )

  function handleBtnRoll(){ //change the number when press on Roll
    SetrandState( old=>old.map(ob=>{
      return ob.isHeld?
        {...ob}:
        {
          ...ob,
          randNum:Math.floor(Math.random()*6)+1
        } 
  }))
}

  function handleBtnDice(id: number){
    SetrandState(oldDice=>
      oldDice.map(di=>{
        return id===di.keyIdx ?
        { ...di, isHeld: !di.isHeld} :
        {...di}
      })
    )
  }
  function handleBtnNewGame(){
    setTenz(false)
    SetrandState(allNewDice)
  }

  return (
    <div className="AppContainer">
      <div className="AShape">
        {tenz && <Confetti/>}
        <h1 className="Atitle">Tenzies</h1>
        <p className="Ainstructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="ADiesContainer">
          {ArrObDiesCall}
        </div>
        {!tenz? <button 
                  className="ABtn" 
                  onClick={handleBtnRoll} >ROLL 
                </button> :
                <button 
                className="ABtnEnd" 
                onClick={handleBtnNewGame} >NewGame 
              </button> 
        }
      </div>
    </div>
  )
}
