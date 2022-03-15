import React from 'react'
import {connect} from 'react-redux'

function ShowCounter(props) {
  return (
    <div>
      <h3>ShowCounter</h3>
      <h2>{props.counter}</h2>
      <button onClick={()=>props.dispatch({ type: "Increment" })}>Increment</button>
      <button onClick={()=>props.dispatch({ type: "Decrement" })}>Decrement</button>
    </div>
  );
}


 const mapReduxStateToProps=(state)=>{   // redux state
    return{
        counter:state.counter,
    }
 }

const newApp = connect(mapReduxStateToProps)(ShowCounter);

export default newApp