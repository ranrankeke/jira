import { useState, useEffect } from 'react'
export const Test = () => {
  const [ num, setNum] = useState(0)

  useEffect(()=> {
    return () => {
      console.log("eff num", num)
    }
  },[num])

  useEffect(()=>{
    let id= setInterval(()=>{
      console.log(num)
    },1000)
    return ()=> clearInterval(id)
  },[num])
  
  return (
    <div>
      <div>{num}</div>
      <button onClick = {()=>setNum(num+1)}>+</button>
    </div>
  )

}