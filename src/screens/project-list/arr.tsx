import { useArray, useMount } from 'utils';
export const Arr = () => {
  const persons:{name: string; age: number}[] =[
    {name:'jack',age:12},
    {name:'susan',age:30}
  ]
  const {value, clear, removeIndex, add} = useArray(persons);
  useMount(()=>{

  })
  
  return(
        <div>
          
           <button onClick={()=>add({name:'tom',age:34})}>添加</button>
           <button onClick={()=>removeIndex(1)}>移出</button>
           <button onClick={()=>clear()}>清除</button>
           <div>
          <span></span>
             {value.map((item,index)=>{
               return <div>
                 <span>{index}</span>
                 <span>{item.name}</span>
                 <span>{item.age}</span>
               </div>
             })}
           </div>
        </div>
  )
}