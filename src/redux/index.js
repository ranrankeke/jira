import React, { useState, useReducer } from 'react'
import myReducer from './reducer'
import List from './List'
export const TodoList = () => {
  const [value, setValue] = useState("")
  const [state, dispatch] = useReducer(myReducer, { count: 0 });

  const content = (e) => {
    console.log("更新前", value)
    setValue(e.target.value);
    console.log("更新后", value)
  }

  return (
    <>
      <input type="text" onKeyUp={content} />
      <List value={value} />
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </>

  )

}