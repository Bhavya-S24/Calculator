
import "./styles.css";
import {useReducer} from 'react';


   
  export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
  }
  function reducer(state, { type, digit,opp }) {
  switch(type){
    case ACTIONS.CLEAR: return {}

    case ACTIONS.DELETE_DIGIT: 
    if (state.overwrite) 
      {return {
        ...state,
        overwrite: false,
        currentOperand: null,
      }}
    
      if(state.currentOperand==null)
      {return{...state,
        currentOperand:state.previousOperand,
        previousOperand:null,
      operation:null,
    }}
    
    if (state.currentOperand.length === 1) {
      return { ...state, currentOperand: null }
    }

      return{...state,
      currentOperand:state.currentOperand.slice(0,-1),}


    case ACTIONS.ADD_DIGIT: 
    if (state.overwrite)
    { return{...state,
      currentOperand:digit,
         overwrite:false,
    }}

    /* if(state.previousOperand !== null && state.currentOperand==null)
    { return{...state,
     currentOperand:digit,
    }} */

if(digit==="0" && state.currentOperand==="0") {return state}
if(digit==="." && state.currentOperand.includes(".")) {return state}

return { ...state, 
  currentOperand: `${state.currentOperand || ""}${digit}`,
}


case ACTIONS.CHOOSE_OPERATION: 
if (state.currentOperand == null && state.previousOperand == null) {
  return state
}

  if(state.currentOperand==null){return{...state,operation:opp,}}

  
  if (state.previousOperand==null) {
  return{...state, 
    operation:opp,
     previousOperand:state.currentOperand,
     currentOperand:null,
    }
  }

return{...state,
previousOperand:evaluate(state),
currentOperand:null,
operation:null,
}

case ACTIONS.EVALUATE: 

if(state.previousOperand==null || state.currentOperand==null) {return{...state}}

return{...state,
previousOperand:null,
operation:null,
currentOperand:evaluate(state),
overwrite:true}

  }
}

function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return "" //
  let computation="";
  switch(operation)
  {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()

  }



 
    function formatOperand(operand) {

      const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
        maximumFractionDigits: 0, })
     
      if (operand == null) return;
          const [integer, decimal] = operand.split(".")
      if (decimal == null) { return (INTEGER_FORMATTER.format(integer)); }
      else { return(`${INTEGER_FORMATTER.format(integer)}.${decimal}`); }
    }
    

function App(){

  const[{previousOperand,currentOperand,operation},dispatch]=useReducer(reducer,{})

  return (
    <div>
   <h1>Calculator</h1>
   <div className="calculator-grid"> 

      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
 
     <button className="span-two" onClick={() => dispatch({type:ACTIONS.CLEAR})}>AC</button> 
     <button onClick={() => dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button> 
     <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, opp:"÷"})} >÷</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT,digit:"1"})}>1</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"2" })} >2</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"3" })} >3</button> 
     <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, opp:"*" })} >*</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"4" })} >4</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"5" })} >5</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"6" })} >6</button> 
     <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, opp:"+" })} >+</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"7" })} >7</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"8" })} >8</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"9" })} >9</button> 
     <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, opp:"-" })} >-</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"." })} >.</button> 
     <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, digit:"0" })} >0</button> 
     <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE, })} >=</button> 
        
    </div>
    </div>
  );
} 

export default App
