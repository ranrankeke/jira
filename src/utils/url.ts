import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from 'utils'

//返回页面url中 指定键的参数值
export const useUrlQueryParam = <K extends string> (keys: K[]) => {
  // 作用：用于读取和修改当前位置的 URL 中的查询字符串。返回一个包含两个值的数组:当前的seaech参数、更新search的函数。
  const [ searchParams, setSearchParam ] = useSearchParams()
  return [
    useMemo(
      //reducer() 一个参数是回调函数，函数第一个参数是初始值，第二个参数是当前元素
      ()=> keys.reduce(( prev: any, key: K ) => {
      //[key] 表示读取变量
        return {...prev, [key]: searchParams.get(key) || ''}
      //reduce()第二个参数为设置初始值
    },{}),[searchParams]),

    (params: Partial<{[key in K]: unknown}>) => {
      //Object.fromEntries() 方法把键值对列表转换为一个对象。
      console.log('searchParams',searchParams)
      const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
      console.log('params',params)
      console.log('o',o)
      return setSearchParam(o)
    }
  ] as const
}