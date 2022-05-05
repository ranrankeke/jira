import { useEffect,useState, useRef } from "react"
//value 可以是任何类型
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

//清理对象空值                object的返回值是键值对 当时是一个函数的时候 就报错
export const cleanObject = (object:{[key: string]: unknown}) => {
  const result = {...object}
  //Object.keys() 返回一个有对象属性名组成的数组，在用forEach（）遍历
  Object.keys(result).forEach(key=>{
    //取到属性名的值 赋值给value
    
    const value = result[key]
    //排除value为0的情况 或者value 是false 或值为false
    if(isVoid(value)){
      
      delete(result[key])
    }
  })
  return result
}
//自定义hook 必须用use开头
export const useMount = (callback:() => void) => {
  useEffect(()=>{
    //依赖项里面加上callback 会造成无限循环
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
}
// 自定义hook里面会使用其他hook 
// 去抖 hook                 delay也可以不传 ？. 表示可选
// 泛型 先定义一个泛型的占位符，然后value参数也就是v 它的返回值也就是v 相当于进行了绑定，在后面应用的时候，当传入的value 是什么类型，泛型V也就确定了
export const useDebounce = <V>(value:V, delay?:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(()=>{
    //每次在value 变化后 设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value),delay)
    //清理上一个定时器的任务 如果没有的话就会一直发送请求
    //每次在上一个useEffect处理完之后在运行  只有最后一个timeout 能留下来
    return () => clearTimeout(timeout)
  },[value,delay])
  return debouncedValue
}

//这样写的话，不能高度复用了？
// interface P {
//   name: string;
//   personId: string
// }

// export const useDebounce = (value:P, delay?:number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(()=>{
//     //每次在value 变化后 设置一个定时器
//     const timeout = setTimeout(() => setDebouncedValue(value),delay)
//     //清理上一个定时器的任务 如果没有的话就会一直发送请求
//     //每次在上一个useEffect处理完之后在运行  只有最后一个timeout 能留下来
//     return () => clearTimeout(timeout)
//   },[value,delay])
//   return debouncedValue
// }

//这个空数组的类型是T
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value,item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index,1)
      setValue(copy)
    }
  }

}

export const useDocumentTitle = (title: string, keepOnUnmout: boolean = true) => {
const oldTitle = useRef(document.title).current
//在使用useRef 前：
 //页面加载 是旧title
 //页面加载完 是新title 
  useEffect(()=> {
    document.title = title
  },[title])

  useEffect(()=>{
    return ()=>{
      if(!keepOnUnmout){
        //当没有依赖项时 利用了闭包的原理 读到的是旧title
        document.title = oldTitle
      }
    }
  },[keepOnUnmout,oldTitle])
}
//window.location.origin（'?'前边的URL）
export const restRoute = () => window.location.href = window.location.origin