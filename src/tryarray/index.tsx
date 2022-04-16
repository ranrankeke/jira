
import { useArray, useMount } from 'utils';

export const TsReactTest = () => {
  //创建初始值
  const person: { name: string, age: number }[] = [
    { name: 'tom', age: 23 },
    { name: 'jarry', age: 20 }
  ]
  //从useArray hook中解构出来里面函数 并传入初始值
  const { value, add, removeIndex, clear } = useArray(person)
  useMount(() => {

  })

  return (
    <>
      <button onClick={() => add({ name: 'susan', age: 30 })}>添加</button>
      <button onClick={() => removeIndex(0)}>删除</button>
      <button onClick={() => clear()}>清理</button>

      {value.map((person: { name: string, age: number }, index: number) => {
        return (
          <div key={index} >
            <span>{person.name}</span>
            <span>{person.age}</span>
            <span>{index}</span>
          </div>
        )
      })}

    </>
  )
} 