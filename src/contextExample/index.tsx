import { useState, createContext,useContext } from "react"
//创建全局context
const CountContext = createContext(0)
//父组件
export const Example = () => {
  const [count,setCount] = useState(0)
  
  return (
    <div>
      <div>父组件点击数量{count}</div>
      <button onClick={ () => setCount(count+1) }>+1</button>
      {/* 利用 */}
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  )
}
//子组件
const Counter = () => {
  const count = useContext(CountContext);
  return <p>子组件获得的点击数量：{count}</p>;
}
