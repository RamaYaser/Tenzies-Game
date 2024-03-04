/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type props={
  num: number;
  keyIdx: number;
  isHeld: boolean;
  holdDice: (p:any)=>any;
}

function Die({keyIdx,num, isHeld, holdDice}:props){
  
  return(
    <div className={!isHeld? "DiceFace" :"DicefaceHeld"} onClick={holdDice}>
      <p>{num}</p>
    </div>
  )
}

export default Die