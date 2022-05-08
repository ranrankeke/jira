import { useReducer } from 'react';
  
const initialState = {count: 0};

function reducer(state:any, action: any) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}




// import { useState, useEffect } from 'react'
// export const Test = () => {
//   const [ num, setNum] = useState(0)

//   useEffect(()=> {
//     return () => {
//     }
//   },[num])

//   useEffect(()=>{
//     let id= setInterval(()=>{
//     },1000)
//     return ()=> clearInterval(id)
//   },[num])
  
//   return (
//     <div>
//       <div>{num}</div>
//       <button onClick = {()=>setNum(num+1)}>+</button>
//     </div>
//   )

// }